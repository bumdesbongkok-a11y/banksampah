/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : setoran.js

   Fungsi :
   - Controller modul setoran
===================================================== */


let editSetoranId = null;




/* =====================================================
   INIT SETORAN
===================================================== */

async function initSetoran(){


    console.log(
        "initSetoran berjalan"
    );


    resetFormSetoran();


    await loadSetoranFirebase();


    isiDropdownRWSetoran();


    isiDropdownAnggotaSetoran();


    isiDropdownBarangSetoran();


    isiDropdownRWFilterSetoran();


    isiDropdownFilterAnggotaSetoran();


    tampilSetoran();


    updateDashboard();


    eventSetoran();


}





/* =====================================================
   EVENT SETORAN
===================================================== */

function eventSetoran(){



    const btnSimpan =

    el("btnSimpanSetoran");



    if(btnSimpan){


        btnSimpan.onclick =

        simpanSetoran;


    }





    const btnUpdate =

    el("btnUpdateSetoran");



    if(btnUpdate){


        btnUpdate.onclick =

        updateSetoran;


    }





    const btnBatal =

    el("btnBatalSetoran");



    if(btnBatal){


        btnBatal.onclick =

        resetFormSetoran;


    }





    const rw =

    el("cmbRWSetoranInput");



    if(rw){


        rw.onchange =

        isiDropdownAnggotaSetoran;


    }





    const barang =

    el("cmbJenisBarang");



    if(barang){


        barang.onchange =

        pilihHargaSetoran;


    }





    const berat =

    el("txtBerat");



    if(berat){


        berat.oninput =

        hitungTotalSetoran;


    }





    const tanggal =

    el("txtTanggal");



    if(tanggal){


        tanggal.onchange = ()=>{


            setValue(

                "txtHari",

                getNamaHari(

                    getValue("txtTanggal")

                )

            );


        };


    }
	
	el("cmbRWSetoran")
.addEventListener(
    "change",
    isiDropdownFilterAnggotaSetoran
);

el("btnFilterSetoran")
.onclick = tampilSetoran;

el("btnResetFilterSetoran")
.onclick = resetFilterSetoran;

el("cmbRWSetoran")
.addEventListener(
    "change",
    ()=>{

        isiDropdownFilterAnggotaSetoran();

    }
);


}





/* =====================================================
   SIMPAN SETORAN
===================================================== */

async function simpanSetoran(){



    const rw =

    getValue(

        "cmbRWSetoranInput"

    );



    const idAnggota =

    getValue(

        "cmbAnggota"

    );



    const idBarang =

    getValue(

        "cmbJenisBarang"

    );





    if(!rw){


        alert(

            "RW belum dipilih"

        );


        return;


    }





    if(!idAnggota){


        alert(

            "Anggota belum dipilih"

        );


        return;


    }





    if(!idBarang){


        alert(

            "Barang belum dipilih"

        );


        return;


    }





    const anggota =

    DATA.anggota.find(item=>


        item.firestoreId === idAnggota


    );





    const barang =

    DATA.harga.find(item=>


        item.firestoreId === idBarang


    );





    const data = {


        tanggal:

        getValue(

            "txtTanggal"

        ),



        hari:

        getValue(

            "txtHari"

        ),



        rw:



        rw,



        idAnggota:



        idAnggota,



        namaAnggota:



        anggota.nama,



        jenisBarang:



        barang.jenisBarang,



        berat:



        getNumber(

            "txtBerat"

        ),



        harga:



        getNumber(

            "txtHargaSetoran"

        ),



        total:



        getNumber(

            "txtTotal"

        ),



        waktuInput:

        new Date()


    };





    try{


        const firestoreId =

        await simpanSetoranFirebase(

            data

        );



        data.firestoreId =

        firestoreId;



        DATA.setoran.push(

            data

        );



        tampilSetoran();

		updateDashboard();

        resetFormSetoran();



        alert(

            "Setoran berhasil disimpan"

        );



    }catch(error){



        console.error(error);



        alert(

            "Gagal menyimpan setoran"

        );


    }


}





/* =====================================================
   EDIT SETORAN
===================================================== */

function editSetoran(

    firestoreId

){



    const data =

    DATA.setoran.find(item=>


        item.firestoreId === firestoreId


    );



    if(!data)

    return;



    editSetoranId =

    firestoreId;



    setValue(

        "txtTanggal",

        data.tanggal

    );


    setValue(

        "txtHari",

        data.hari

    );


    setValue(

        "cmbRWSetoranInput",

        data.rw

    );



    isiDropdownAnggotaSetoran();



    setValue(

        "cmbAnggota",

        data.idAnggota

    );



    const barang =

    DATA.harga.find(item=>


        item.jenisBarang === data.jenisBarang


    );



    if(barang){


        setValue(

            "cmbJenisBarang",

            barang.firestoreId

        );


    }



    setValue(

        "txtBerat",

        data.berat

    );


    setValue(

        "txtHargaSetoran",

        data.harga

    );


    setValue(

        "txtTotal",

        data.total

    );



    disable(

        "btnSimpanSetoran"

    );


    enable(

        "btnUpdateSetoran"

    );


    enable(

        "btnBatalSetoran"

    );


}





/* =====================================================
   UPDATE SETORAN
===================================================== */

async function updateSetoran(){


    if(!editSetoranId)

    return;



    // sementara gunakan data dari form

    const idAnggota =

getValue("cmbAnggota");


const idBarang =

getValue("cmbJenisBarang");



const anggota =

DATA.anggota.find(item =>

    item.firestoreId === idAnggota

);



const barang =

DATA.harga.find(item =>

    item.firestoreId === idBarang

);



const data = {


    tanggal:

    getValue("txtTanggal"),


    hari:

    getValue("txtHari"),


    rw:

    getValue("cmbRWSetoranInput"),


    idAnggota:


    idAnggota,


    namaAnggota:


    anggota ? anggota.nama : "",


    jenisBarang:


    barang ? barang.jenisBarang : "",


    berat:

    getNumber("txtBerat"),


    harga:

    getNumber("txtHargaSetoran"),


    total:

    getNumber("txtTotal"),


    waktuUpdate:

    new Date()


};



    try{


        await updateSetoranFirebase(

            editSetoranId,

            data

        );



        await loadSetoranFirebase();



        tampilSetoran();

		updateDashboard();

        resetFormSetoran();



        editSetoranId = null;



        alert(

            "Setoran diperbarui"

        );


    }catch(error){


        console.error(error);


        alert(

            "Update gagal"

        );


    }


}





/* =====================================================
   HAPUS SETORAN
===================================================== */

async function hapusSetoran(

    firestoreId

){


    if(!confirm(

        "Hapus data setoran?"

    ))

    return;



    try{


        await hapusSetoranFirebase(

            firestoreId

        );



        DATA.setoran =

        DATA.setoran.filter(item=>


            item.firestoreId !== firestoreId


        );



        tampilSetoran();
		updateDashboard();



    }catch(error){


        console.error(error);


        alert(

            "Hapus gagal"

        );


    }


}