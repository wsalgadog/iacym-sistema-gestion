<template>

  <div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Cursos</h3>
        </div>
        <br/>
        <div class="panel-body">
            <b-button v-b-modal.modal-prevent-closing @click="addModal">Agregar Curso</b-button>
            <br />
            <br />

            <b-table 
                :items="grupos"
                :fields="fields"
                :small="true"
                :striped="true"
                :bordered="true"   
                :primary-key="grupo.id"   
                :responsive="true"       
                >
                <template v-slot:cell(fechaini)="grupo">
                    <span>{{ grupo.item.fecha_inicio.toDate() | moment("YYYY/MM/DD") }}</span>
                </template>                   
                <template v-slot:cell(fechafin)="grupo">
                    <span>{{ grupo.item.fecha_fin.toDate() | moment("YYYY/MM/DD") }}</span>
                </template>            
                <template v-slot:cell(actions)="grupo">
                    <b-button size="sm" @click="editModal(grupo.item)" class="mr-1">
                    Modificar
                    <b-icon icon="edit" size="is-small"></b-icon>
                    </b-button>
                    <b-button size="sm" @click="deleteGrupo(grupo.item)" class="btn btn-danger btn-sm">
                    Eliminar
                    <b-icon icon="delete" size="is-small"></b-icon>
                    </b-button>
                </template>
            </b-table>

       
        </div>
    </div>


    <ul class="errors">
    </ul>
</div>

</template>

<script>

    import { gruposRef } from './../db'
    import { db } from './../db'

    export default {
        data() {
            return {
                modal: null,       
                titulo: '',     
                idgrupo: null,
                grupos: [],
                grupo: {
                    nombre: '',
                    asistente: '',
                    encargado: '',
                    estado: null,
                    fecha_inicio: '',
                    fecha_fin: ''
                },     
                fields: [                     
                    {
                        key: 'nombre',
                        label: 'Nombre del Curso',
                        sortable: true
                    },
                    {
                        key: 'encargado',
                        sortable: false                      
                    },
                    {
                        key: 'asistente',
                        sortable: true
                    },
                    {
                        key: 'estado',
                        sortable: false
                    },
                    {
                        key: 'fechaini',
                        label: 'Fecha Inicio'
                    },  
                    {
                        key: 'fechafin',
                        label: 'Fecha Fin'
                    },                       
                    {
                        key: 'actions',
                        label: ''
                    },                      
                                                                                                                                         
                ],                
                tipodocs: [{ text: 'Seleccione', value: null }, 'DNI', 'CE'],       
                distritos: ['LOS OLIVOS', 'SAN MARTIN DE PORRES', 'SAN MIGUEL'],
                estadocivil: [{ text: 'Seleccione', value: null }, 'CASADO', 'SOLTERO', 'VIUDO', 'DIVORCIADO', 'CONVIVIENTE', 'SEPARADO'],          
            }
        },
        created(){
            this.$bind('grupos', gruposRef).then(grupos => {
                this.grupos === grupos
            })
            //this.$bindAsArray('personas', personasRef);
        },        
        computed:{
            nombreState() {
                return this.grupo.nombre.length > 2 ? true : false
            }       
        },
        methods: {  
            getitemcontrols() {
                return 'item.controls';
            },            
            addModal(){
                this.modal = 'new';
                this.titulo = "Nuevo Grupo"
                this.resetModal();
                this.$bvModal.show('modal-prevent-closing')
            },
            editModal(grupo) {
                this.idgrupo = grupo.id
                this.modal = 'edit';
                this.titulo = grupo.nombre
                //console.log( this.idpersona)                
                db.collection('grupos')
                    .doc(grupo.id)
                    .get()
                    .then(snapshot => {
                        this.grupo = snapshot.data()
                    })

                //console.log(this.persona)


                //personasRef.child(persona['.key']).update({ edit:true }); 
                this.$bvModal.show('modal-prevent-closing')
            },            
            resetModal(){
                this.grupo = {
                    nombre: '',
                    asistente: '',
                    encargado: '',
                    estado: null,
                    fecha_inicio: '',
                    fecha_fin: ''
                }
                this.idgrupo = null
            },            
            updateGrupo(){
                db.collection('grupos')
                    .doc(this.idgrupo)
                    .set(this.grupo)
                    .then(() => {
                        //console.log('user updated!')
                    })

                this.$bvModal.hide('modal-prevent-closing')
            },
            addGrupo(){       
                gruposRef.add(this.grupo)
                this.$bvModal.hide('modal-prevent-closing')
            },
            deleteGrupo(grupo){
                gruposRef.doc(grupo.id).delete()             
            },         
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                return valid
            },            
            handleOk(bvModalEvt) {
                // Prevent modal from closing
                bvModalEvt.preventDefault()
                // Trigger submit handler
                this.handleSubmit()
            },
            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    return
                }
                // Push the name to submitted names
                //this.submittedNames.push(this.name)
                // Hide the modal manually
                if(this.modal=="edit")
                { 
                    this.updateGrupo()
                } else {
                    this.addGrupo()
                }
                
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
            },
            formatoMayusculas(value) {
                return value.toUpperCase();
            },
            formatoMinusculas(value) {
                return value.toLowerCase();
            }                               
        }
    }

</script>