import * as SQLite from 'expo-sqlite'
import History from '../entities/History'

const db = SQLite.openDatabase('history.db')

export const initDB= () => {
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                `CREATE TABLE IF NOT EXISTS history (
                    id INTEGER PRIMARY KEY,
                    playerchoice TEXT NOT NULL,
                    bootchoice TEXT NOT NULL,
                    result TEXT NOT NULL
                )`, [],
                (_, res) => resolve(res),
                (_, err) => reject(err)
            )
        })
    })
}

export const getTableInfo = () => {
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                `pragma table_info('history')`, [],
                (_, res) => resolve(res),
                (_, err) => reject(err)
            )
        })
    })
}

export const insert = (history) => {
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                `INSERT INTO history (playerchoice, bootchoice, result)
                VALUES (?, ?, ?)`, [history.playerChoice, history.bootChoice, history.result],
                (_, res) => resolve(res),
                (_, err) => reject(err)
            )
        })
    })
}

export const findAll = () => {
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                `SELECT * FROM history`, [],
                (_, res) => resolve(res.rows._array
                    .map(row => new History(row.id, row.playerchoice, row.bootchoice, row.result))),
                (_, err) => reject(err)
            )
        })
    })
}

export const deleteAll = () => {
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                `DELETE FROM history`, [],
                (_, res) => resolve(res),
                (_, err) => reject(err)
            )
        })
    })
}

export const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                `DELETE FROM history WHERE id = ?`, [id],
                (_, res) => resolve(res),
                (_, err) => reject(err)
            )
        })
    })
}