<template>
    <div>
        <div class="container">
            <div class="row mt-5">
                <div class="col-12 float-right">
                    <p class="h4">
                        RESULTADOS
                    </p>
                </div>
                <div class="col-12 float-right">
                    <b-form-checkbox v-model="average">
                        Mostrar promedios
                    </b-form-checkbox>
                </div>
                <div class="col-12">
                    <b-table responsive striped hover :dark="true" :fields="fields" :items="items" border foot-clone>

                        <!-- HEADER -->
                        <template v-slot:head(title)="data">
                            Tiendas
                        </template>

                        <template v-slot:head(peasants)="data">
                            Paseantes
                        </template>

                        <template v-slot:head(visitors)="data">
                            Visitas
                        </template>

                        <template v-slot:head(attraction)="data">
                            Atracción
                        </template>

                        <template v-slot:head(cabinet)="data">
                            Gabinete
                        </template>

                        <template v-slot:head(tickets)="data">
                            Tickets
                        </template>

                        <template v-slot:head(persuasion)="data">
                            Conversión de compra
                        </template>

                        <template v-slot:head(revenue)="data">
                            Ingresos
                        </template>

                        <template v-slot:head(averageTicket)="data">
                            boleto promedio
                        </template>

                        <template v-slot:head(items)="data">
                            Articulos
                        </template>

                        <template v-slot:head(itemperTicket)="data">
                            Articulo x ticket
                        </template>

                        <template v-slot:head(averagePermanence)="data">
                            Permanencia promedio
                        </template>

                        <!-- CELLS -->
                        <template v-slot:cell(title)="data">
                            <div class="text-center">
                                {{ data.item.title }}
                            </div>
                        </template>

                        <template v-slot:cell(peasants)="data">
                            <div class="text-center">
                                {{ data.item.peasants | quantity}}
                            </div>
                        </template>

                        <template v-slot:cell(visitors)="data">
                            <div class="text-center">
                                {{ data.item.visitors | quantity}}
                            </div>
                        </template>

                        <template v-slot:cell(attraction)="data">
                            <div class="text-center">
                                {{ data.item.attraction | percentage(2) }}
                            </div>
                        </template>

                        <template v-slot:cell(cabinet)="data">
                            <div class="text-center">
                                {{ data.item.cabinet | quantity }}
                            </div>
                        </template>

                        <template v-slot:cell(tickets)="data">
                            <div class="text-center">
                                {{ data.item.tickets | quantity }}
                            </div>
                        </template>

                        <template v-slot:cell(persuasion)="data">
                            <div class="text-center">
                                {{ data.item.persuasion | percentage(2) }}
                            </div>
                        </template>

                        <template v-slot:cell(revenue)="data">
                            <div class="text-center">
                                {{ data.item.revenue  | quantity}}
                            </div>
                        </template>

                        <template v-slot:cell(averageTicket)="data">
                            <div class="text-center">
                                {{ data.item.averageTicket | quantity}}
                            </div>
                        </template>

                        <template v-slot:cell(items)="data">
                            <div class="text-center">
                                {{ data.item.items | quantity}}
                            </div>
                        </template>

                        <template v-slot:cell(itemperTicket)="data">
                            <div class="text-center">
                                {{ data.item.itemperTicket | quantity}}
                            </div>
                        </template>

                        <template v-slot:cell(averagePermanence)="data">
                            <div class="text-center">
                                {{ data.item.averagePermanence | quantity}}
                            </div>
                        </template>

                        <!-- FOOT -->
                        <template v-slot:foot(title)="data">
                           Totales
                        </template>

                        <template v-slot:foot(peasants)="data">
                            {{ totals[data.field.key] | quantity }}
                        </template>

                        <template v-slot:foot(visitors)="data">
                            {{ totals[data.field.key] | quantity }}
                        </template>

                        <template v-slot:foot(attraction)="data">
                            {{ totals[data.field.key] | percentage(2) }}
                        </template>

                        <template v-slot:foot(cabinet)="data">
                           {{ totals[data.field.key] |quantity }}
                        </template>

                        <template v-slot:foot(tickets)="data">
                            {{ totals[data.field.key] | quantity}}
                        </template>

                        <template v-slot:foot(persuasion)="data">
                            {{ totals[data.field.key] | percentage(2) }}
                        </template>

                        <template v-slot:foot(revenue)="data">
                            {{ totals[data.field.key] | quantity}}
                        </template>

                        <template v-slot:foot(averageTicket)="data">
                            {{ totals[data.field.key] | quantity}}
                        </template>

                        <template v-slot:foot(items)="data">
                            {{ totals[data.field.key] | quantity}}
                        </template>

                        <template v-slot:foot(itemperTicket)="data">
                            {{ totals[data.field.key] | quantity}}
                        </template>

                        <template v-slot:foot(averagePermanence)="data">
                            {{ totals[data.field.key] | quantity}}
                        </template>

                    </b-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [],
                fields: [],
                totals: {},
                average: false
            }
        },
        watch: {
            average(status) {
                if(status) {
                    this.items = []
                    this.setAverage()
                }
                else {
                    this.items = []
                    this.setData()
                }
            }
        },
        methods: {
            setData() {

                for(let store of assignedStore.data) {
                    for(let dataBrand of brandDateData) {

                        if(store.identifier == dataBrand.identifier) {

                            let data = {}

                            for(let key in dataBrand) {

                                if(typeof dataBrand[key] === 'object') {
                                    data[key] = 0
                                    for(let dates in dataBrand[key]) {
                                        data[key] += dataBrand[key][dates]
                                    }
                                }
                            }

                            this.items.push({
                                title: store.name,
                                peasants: data.peasants,
                                visitors: data.visitors,
                                attraction: (data.visitors / data.peasants),
                                cabinet: data.cabinet,
                                tickets: data.tickets,
                                persuasion: (data.tickets / data.visitors),
                                revenue: data.revenue,
                                averageTicket: (data.revenue / data.tickets),
                                items: data.items,
                                itemperTicket: ( (data.items / data.items) / 100 ),
                                averagePermanence: (((data.permanence * 100) / data.permanenceCount) / 6000000)
                            })
                        }

                    }
                }

            },
            setAverage() {

                for(let store of assignedStore.data) {
                    for(let dataBrand of brandDateData) {

                        if(store.identifier == dataBrand.identifier) {

                            let data = {}

                            for(let key in dataBrand) {

                                if(typeof dataBrand[key] === 'object') {
                                    data[key] = 0
                                    for(let dates in dataBrand[key]) {
                                        data[key] += dataBrand[key][dates]
                                    }

                                    data[key] = data[key] / Object.keys(dataBrand[key]).length
                                }
                            }

                            this.items.push({
                                title: store.name,
                                peasants: data.peasants,
                                visitors: data.visitors,
                                attraction: (data.visitors / data.peasants),
                                cabinet: data.cabinet,
                                tickets: data.tickets,
                                persuasion: (data.tickets / data.visitors),
                                revenue: data.revenue,
                                averageTicket: (data.revenue / data.tickets),
                                items: data.items,
                                itemperTicket: ( (data.items / data.items) / 100 ),
                                averagePermanence: (((data.permanence * 100) / data.permanenceCount) / 6000000)
                            })
                        }

                    }
                }

            },
            setTotal() {

                let data = {}

                for(let item of this.items) {
                    for(let key in item) {
                        data[key] = item[key]
                    }
                }

                this.totals = {
                    title: data.title,
                    peasants: data.peasants,
                    visitors: data.visitors,
                    attraction: data.attraction,
                    cabinet: data.cabinet,
                    tickets: data.tickets,
                    persuasion: data.persuasion,
                    revenue: data.revenue,
                    averageTicket: data.averageTicket,
                    items: data.items,
                    itemperTicket: data.itemperTicket,
                    averagePermanence: data.averagePermanence
                }
            },
            setFields() {

                this.fields.push(
                    'title',
                    'peasants',
                    'visitors',
                    'attraction',
                    'cabinet',
                    'tickets',
                    'persuasion',
                    'revenue',
                    'averageTicket',
                    'items',
                    'itemperTicket',
                    'averagePermanence')
            }
        },
        created() {
            this.setFields()
            this.setData()
            this.setTotal()

        }

    }
</script>
