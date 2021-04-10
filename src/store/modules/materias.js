import firebase from'@/firebase'
import router from '@/router'
import Vue from 'vue'
// import { v4 as uuidv4 } from 'uuid';
const db = firebase.firestore()
export default{
    namespaced: true,
    state:{
        materias:[],
        materiasEstudiante:{}
    }, 
    actions:{
    async getMaterias({commit}){
        try {
            const res = await db.collection('Materias').get()
            const materias  =  await res.docs.map(doc => {return{...doc.data(), id: doc.id}})
            // console.log(materias)
            commit('SET_MATERIAS', materias)
        } catch (error) {
            console.log(error)
            return error
        }
    },
    async getMateriasEstudiante({commit}){
        try {
            const res = await db.collection('Materias_Estudiante').doc(JSON.parse(localStorage.getItem('user')).id).get()
            const materias  = res.data().materias
            // console.log(res.data().materias)
            commit('SET_MATERIAS_ESTUDIANTE', materias)
        } catch (error) {
            console.log(error)
            return error
        }
    }, 
    async cargaMateria({commit}, materia){
        try {
            let {id, ...storeMateria} = materia 
            const res = await db.collection('Materias_Estudiante').doc(JSON.parse(localStorage.getItem('user')).id).set({"materias":{[materia.id]:storeMateria}}, {merge:true})
            commit('ADD_MATERIA_ESTUDIANTE', materia)
            return {}
        } catch (error) {
            console.log(error)
            return error
        }
    }
    },
    mutations:{
        SET_MATERIAS(state, materias){
            state.materias = materias
        },
        SET_MATERIAS_ESTUDIANTE(state, materias){
            state.materiasEstudiante = materias
        },
        ADD_MATERIA_ESTUDIANTE(state, materia) {
            let {id, ...storeMateria} = materia 
            // state.materiasEstudiante[materia.id] = {...storeMateria}
            Vue.set(state.materiasEstudiante,materia.id, storeMateria)
        },
    },
    getters:{
        estudianteTieneMaterias: state =>{
            return Object.keys(state.materiasEstudiante).length > 0
        },
        materiasDisponibles: state =>{
            let studentSubjectsArray = Object.keys(state.materiasEstudiante)
            return state.materias.filter(x =>!studentSubjectsArray.includes(x.id))
        },
        hayMateriasDisponibles: (state, getters) =>{
            return getters.materiasDisponibles.length > 0
        }
    }
}