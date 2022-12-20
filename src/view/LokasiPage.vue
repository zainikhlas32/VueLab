<template>
    <div>
        <div>
            <h2>ini halaman Lokasi</h2>
        </div>
        <div>
            <input type="text" class="form-control" ref="lat" v-model="lat" placeholder="latitude"/>
            <input type="text" class="form-control" ref="lon" v-model="lon" placeholder="longitude"/>
            <input type="text" class="form-control" ref="nama" v-model="nama" placeholder="nama"/>
            <input type="text" class="form-control" ref="keterangan" v-model="keterangan" placeholder="keterangan"/>
            <input type="text" class="form-control" ref="kontributor" v-model="kontributor" placeholder="kontributor"/>
            <button class="btn btn-success" v-on:click="tambahData">Simpan</button>
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">latitude</th>
                <th scope="col">longitude</th>
                <th scope="col">nama</th>
                <th scope="col">keterangan</th>
                <th scope="col">kontributor</th>
                <th scope="col">action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value,index) in daftar" :key="index">
                <th scope="row">{{ value.id }}</th>
                <td>{{ value.lat }}</td>
                <td>{{ value.lon }}</td>
                <td>{{ value.nama }}</td>
                <td>{{ value.keterangan }}</td>
                <td>{{ value.kontributor }}</td>
                <button class="btn btn-warning" data-toggle="modal" v-on:click="ubahData(value)" data-target="#editModal">Edit</button>
                <button class="btn btn-danger">Hapus</button>
                </tr>
                
            </tbody>
        </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Data</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <input type="text" class="form-control" ref="lat" v-model="formEdit.lat" placeholder="latitude"/>
            <input type="text" class="form-control" ref="lon" v-model="formEdit.lon" placeholder="longitude"/>
            <input type="text" class="form-control" ref="nama" v-model="formEdit.nama" placeholder="nama"/>
            <input type="text" class="form-control" ref="keterangan" v-model="formEdit.keterangan" placeholder="keterangan"/>
            <input type="text" class="form-control" ref="kontributor" v-model="formEdit.kontributor" placeholder="kontributor"/>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primarpy" v-on:click="perbaruiData" data-dismiss="modal">Save changes</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default{
        name: 'LokasiPage',
        data: function(){
            return{
                no:2,
                daftar:[
                    {no:1,lat:'123', lon:'321',nama:'tes',keterangan:'-',kontributor:'--'},
                    {no:2,lat:'456', lon:'654',nama:'tes2',keterangan:'-',kontributor:'--'}
                ],
                lat:null,lon:null,nama:null,keterangan:null,kontributor:null,
                formEdit:{
                    lat:null,lon:null,nama:null,keterangan:null,kontributor:null
                }
            }
        },
        methods: {
            // getLokasi: function() {
            //     fetch('https://service.garasitekno.com/lokasi.php')
            //     .then(res=>{
            //         // console.log(res.json())
            //         return res.json()
            //     })
            //     .then(data=>this.daftar=data['data'])
            // }
            getLokasi: function(){
                this.axios.get('https://service.garasitekno.com/lokasi.php')
                .then(res=> {
                    // console.log(res.data)
                    this.daftar = res.data['data']
                })
            },
            // tambahData: function(){
            //     let formData = new FormData()
            //     formData.append('aksi','simpan')
            //     formData.append('lat',this.lat)
            //     formData.append('nama',this.nama)
            //     formData.append('lon',this.lon)
            //     formData.append('keterangan',this.keterangan)
            //     formData.append('kontributor',this.kontributor)
            //     fetch('https://service.garasitekno.com/lokasi.php', {
            //         method:"POST",
            //         body: formData
            //     }).then(res => {
            //         return res.json()
            //     }).then(res => {
            //         console.log(res.message)
            //     })
            //     this.lat = "";
            //     this.lon = "";
            //     this.nama = "";
            //     this.keterangan = "";
            //     this.kontributor = "";
            // }
            tambahData: function() {
                let formData = new FormData()
                formData.append('aksi','simpan')
                formData.append('lat',this.lat)
                formData.append('nama',this.nama)
                formData.append('lon',this.lon)
                formData.append('keterangan',this.keterangan)
                formData.append('kontributor',this.kontributor)
                this.axios.post('https://service.garasitekno.com/lokasi.php',formData)
                .then(res=>{
                    console.log(res)
                    this.getLokasi()
                })
                .catch(err => {
                    this.errorMessage = err.message
                    console.error("There was an error!", err)
                })
                this.lat = null
                this.lon = null;
                this.nama = null;
                this.keterangan = null;
                this.kontributor = null;
            },
            ubahData: function(val) {
                console.log(val)
                this.formEdit.lat = val.lat
                this.formEdit.lon = val.lon;
                this.formEdit.nama = val.nama;
                this.formEdit.keterangan = val.keterangan;
                this.formEdit.kontributor = val.kontributor;
                this.formEdit.id = val.id;
                
            },
            perbaruiData: function(){
                let formData = new FormData()
                formData.append('aksi','simpan')
                formData.append('lat',this.formEdit.lat)
                formData.append('nama',this.formEdit.nama)
                formData.append('lon',this.formEdit.lon)
                formData.append('keterangan',this.formEdit.keterangan)
                formData.append('kontributor',this.formEdit.kontributor)
                formData.append('id',this.formEdit.id)
                this.axios.post('https://service.garasitekno.com/lokasi.php',formData)
                .then(res=>{
                    console.log(res)
                    this.getLokasi()
                })
                .catch(err => {
                    this.errorMessage = err.message
                    console.error("There was an error!", err)
                })
            }
        },
        beforeMount: function(){
            this.getLokasi();
            setInterval(() => {
                this.getLokasi();
            }, 30000)
        }
    }
    
</script>