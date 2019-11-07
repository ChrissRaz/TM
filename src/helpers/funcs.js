var moment = require("moment");
import { AsyncStorage } from 'react-native';
import { colors } from 'react-native-elements';

import Store from '../store/ConfigureStore';



//calcule le pourcentage du temps restant d'une tâche
export function getPercentage(task) {
    let lost = 0;


    task.history.forEach((el) => {
        lost += el.dateFin - el.dateDebut;
    });

    return lost / (task.duree);

}


export function convertSecondsToHour(secs) {
    var hours = Math.floor(secs / 3600);
    var minutes = Math.floor((secs - (hours * 3600)) / 60);

    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0')
}


export function getAvailableTime(task) {
    let lost = 0;

    task.history.forEach((el) => {
        lost += el.dateFin - el.dateDebut;

    });

    return task.duree - lost;

}


export function formatDate(date: Date, delim = "-") {
    return (date.getDate()) + delim + (+date.getMonth() + 1) + delim + date.getFullYear();
}


//id generator  function
export const init_id_gen = (id = 0) => () => id++;


//Feeching datas
export const findAll = async (key: String) => {
    try {
        const value = await AsyncStorage.getItem(key).then(
            data => data
        );
        if (value !== null) {

            return JSON.parse(value);

        }
        else {
            return null;
        }

    } catch (error) {

        console.warn("Error loading data in Task Reducer " + error);

        return null;
    }
};


//condideration of off state missing
export const findTodayTask = async () => {
    try {
        let value = await AsyncStorage.getItem('userTasks').then(
            data => data
        );
        if (value !== null) {


            value = JSON.parse(value);


            let filtred = value.tasks.filter(
                el => el.date == formatDate(new Date())

            );


            if (filtred.length > 0) {

                //ordering the chain of tasks
                filtred.sort((a, b) => {
                    return a.next - b.next;
                });


                //evaluating lost time whe the app was innactive
                let lastWorkingTime = filtred.find(el => el.actif == true);


                lastWorkingTime = lastWorkingTime.history[lastWorkingTime.history.length - 1].dateFin;


                let assignedElapsedTime = 0;

                let lastHistoryAsigned = lastWorkingTime;

                filtred = filtred.map(
                    el => {
                        let TimeElapsedOff = Math.floor((Date.now() / 1000) - lastWorkingTime);


                        if (assignedElapsedTime < TimeElapsedOff) {

                            if (el.duree <= (TimeElapsedOff - assignedElapsedTime)) {
                                assignedElapsedTime += el.duree;
                                var nexBegnignHistory = lastHistoryAsigned + el.duree;

                                el.history.push({ dateDebut: lastHistoryAsigned, dateFin: nexBegnignHistory, off: true });

                                lastHistoryAsigned = nexBegnignHistory;

                            }
                            else {
                                var nw = Math.floor(Date.now() / 1000);

                                assignedElapsedTime += nw - lastHistoryAsigned;

                                el.history.push({ dateDebut: lastHistoryAsigned, dateFin: nw, off: true });

                            }

                        }

                        return el;
                    }
                );


                let toSave = {
                    ...value,
                    tasks: value.tasks.map(
                        el => {

                            let toUpdate = filtred.find(elem => elem.IdTask == el.IdTask);

                            if (toUpdate != undefined) {
                                return toUpdate;
                            }

                            return el;
                        }
                    )
                };

                add("userTasks", toSave);

                return { tasks: filtred };
            }
            else
            {
                return {
                    tasks: []
                };
            }



        }
        else {
            return {
                tasks: []
            };
        }

    } catch (error) {

        console.warn("Error loading data  (funcs)  " + error);

        return {
            tasks: []
        };
    }
};



//Sotoring data persist  funcs
export const add = async (key: String, datas: Object) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(datas));
    } catch (error) {
        console.warn("error when saving data (funcs) " + error);
    }
};


//amelioration: control datatype, control max hour,...
//this function can add new tasks in the asyncstorage and replace existing data

export const addTasks = async (datas: Object, date = new Date()) => {


    datas.sort((a, b) => {
        return b.actif;
    });

    let journeyBeginingTime = new Date();
    journeyBeginingTime.setHours(0, 0, 0);
    journeyBeginingTime = Math.floor(Date.parse(journeyBeginingTime) / 1000);


    let assignedElapsedTime = 0;

    let lastHistoryAsigned = journeyBeginingTime;




    let dt = formatDate(date);


    //format entries datas to adapt with current time
    findAll("settings").then(
        settingsData => {

            // let lastId = settingsData.lastIndexTask;
            let nextId = init_id_gen(settingsData.lastIndexTask);


            if (dt == formatDate(new Date())) {

                // assigs ID and date to datas
                datas = datas.map(
                    (el, i) => {

                        el.IdTask = nextId();
                        el.date = dt;

                        //tasks are linked like a cahin , the last is linked with the first and an task is linked 
                        //with the next task
                        el.next = i != datas.length ? el.IdTask +1 : el.IdTask-i;



                        let TimeElapsedOff = Math.floor((Date.now() / 1000) - journeyBeginingTime);


                        if (assignedElapsedTime < TimeElapsedOff) {

                            if (el.duree < (TimeElapsedOff - assignedElapsedTime)) {
                                assignedElapsedTime += el.duree;
                                var nexBegnignHistory = lastHistoryAsigned + el.duree;

                                el.history.push({ dateDebut: lastHistoryAsigned, dateFin: nexBegnignHistory, off: true });
                                el.actif = false;

                                lastHistoryAsigned = nexBegnignHistory;

                            }
                            else {
                                var nw = Math.floor(Date.now() / 1000);

                                assignedElapsedTime += nw - lastHistoryAsigned;

                                el.history.push({ dateDebut: lastHistoryAsigned, dateFin: nw, off: true });
                                el.history.push({ dateDebut: nw, dateFin: nw, off: false });
                                el.actif = true;

                            }

                        }

                        return el;
                    }
                );
            }
            else {
                datas = datas.map(
                    el => {

                        el.IdTask = nextId();
                        el.date = dt;
                    });
            }


            //update the last insert id for controling unicity
            settingsData.lastIndexTask = nextId() - 1;



            findAll("userTasks").then(
                data => {
                    let finalToSave = {
                        ...{
                            ...data, tasks: [...data.tasks.filter(
                                el => el.date != dt
                            ), ...datas]
                        }
                    };


                    // just select data fromat another date in the filter and concat new datas with it
                    add("userTasks", finalToSave).then(
                        sv => console.log("new datas added succesfully for "+dt)
                    );
                    add("settings", settingsData);



                    //dispach if the new tasks is for current date
                    if (dt == formatDate(new Date())) {
                        Store.dispatch({ type: 'CONFIGURE_TODAY_TASK', value: finalToSave.tasks });
                    }


                }
            ).catch(
                err => console.warn("error on finding usertasks func " + err)
            );

        }
    ).catch(
        err => console.warn("error on finding seetings func " + err)
    );


};




export const updateTask = async (task: Object) => {


    try {
        findAll("userTasks").then(
            data => {

                let readyToUpdate = {
                    ...data, tasks: [...data.tasks.map(
                        el => {
                            if (el.IdTask == task.IdTask) {
                                return task;
                            }

                            return el;
                        }
                    )]
                };

                add("userTasks", readyToUpdate);
            }
        );
    }

    catch (err) {
        console.log("Error on updating task " + err)
    }

};

export const switchTask = async (IdT) => {
    try {
        let value = await AsyncStorage.getItem('userTasks').then(
            data => data);


        if (value != null) {
            value = JSON.parse(value);


            let nextT = value.tasks.find(
                el => el.IdTask == IdT

            );
            let lastT = value.tasks.find(
                el => el.actif == true

            );

            lastT.actif = false;
            nextT.actif = true;

            // console.warn(lastT);
            // console.warn(nextT);

            nextT.history.push({ dateDebut: lastT.history[lastT.history.length - 1].dateFin, dateFin: Math.floor(Date.now() / 1000), off: false });

            let toSave = {
                ...value,
                tasks: value.tasks.map(
                    el => {


                        if (el.IdTask == lastT.IdTask) {
                            return lastT;
                        }

                        if (el.IdTask == nextT.IdTask) {
                            return nextT;
                        }

                        return el;
                    }
                )
            };

            add("userTasks", toSave);



            let today = toSave.tasks.filter(
                el => el.date == formatDate(new Date())

            );

            // console.log(today.map(e => e.history));

            console.warn("swiching");
            // console.log(today);
            Store.dispatch({ type: "CONFIGURE_TODAY_TASK", value: today });

        }
    }
    catch (err) {
        console.warn(" erreur dans switchTask (func): " + err);
    }
}