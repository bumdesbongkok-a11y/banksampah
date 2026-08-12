/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : anggota.js

   Fungsi :
   - Controller modul anggota
   - Penghubung Firebase dan UI
===================================================== */



let editAnggotaId = null;




/* =====================================================
   INIT ANGGOTA
===================================================== */

async function initAnggota(){


    console.log(
        "initAnggota berjalan"
    );



    resetFormAnggota();



    await loadAnggotaFirebase();

	generateIdAnggota();

    tampilAnggota();

	updateDashboard();

    eventAnggota();



}





/* =====================================================
   EVENT ANGGOTA
===================================================== */

function eventAnggota(){


    const btnSimpan =
    el("btnSimpanAnggota");


    if(btnSimpan){

        btnSimpan.onclick =
        simpanAnggota;

    }



    const btnUpdate =
    el("btnUpdateAnggota");


    if(btnUpdate){

        btnUpdate.onclick =
        updateAnggota;

    }




    const btnBatal =
    el("btnBatalAnggota");


    if(btnBatal){

        btnBatal.onclick =
        resetFormAnggota;

    }





    const cari =
    el("txtCariAnggota");


    if(cari){


        cari.addEventListener(

            "input",

            tampilAnggota

        );


    }



}





/* =====================================================
   SIMPAN ANGGOTA
===================================================== */

async function simpanAnggota(){


    const nama =
    getValue("txtNama")
    .trim();



    const rw =
    getValue("cmbRW");



    if(!nama){


        alert(
            "Nama anggota belum diisi"
        );


        return;

    }



    if(!rw){


        alert(
            "RW belum dipilih"
        );


        return;

    }





    const data = {

    idAnggota:
    getValue(
        "txtIdAnggota"
    ),

    nama:
    nama,

    rw:
    "RW " + rw,

    ikutRanking:
    el("chkIkutRanking").checked,

    tanggalDaftar:
    new Date()

};




    try{


        const firestoreId =

        await simpanAnggotaFirebase(
            data
        );



        data.firestoreId =
        firestoreId;



        DATA.anggota.push(
    data
);

tampilAnggota();

updateDashboardAnggota();
updateDashboard();

        resetFormAnggota();



        alert(
            "Data anggota berhasil disimpan"
        );



    }catch(error){


        alert(
            "Gagal menyimpan anggota"
        );


    }

}





/* =====================================================
   EDIT ANGGOTA
===================================================== */

function editAnggota(
    firestoreId
){


    const data =

    DATA.anggota.find(item =>

        item.firestoreId
        === firestoreId

    );



    if(!data) return;



    editAnggotaId =
    firestoreId;



    isiFormAnggota(
        data
    );

}





/* =====================================================
   UPDATE ANGGOTA
===================================================== */

async function updateAnggota(){


    if(!editAnggotaId)
    return;




    const data = {

    nama:
    getValue(
        "txtNama"
    ),

    rw:
    "RW " + getValue(
        "cmbRW"
    ),

    ikutRanking:
    el("chkIkutRanking").checked

};




    try{


        await updateAnggotaFirebase(

            editAnggotaId,

            data

        );



        const index =

        DATA.anggota.findIndex(item =>

            item.firestoreId
            === editAnggotaId

        );



        if(index !== -1){


            DATA.anggota[index] = {


                ...DATA.anggota[index],

                ...data


            };


        }



        tampilAnggota();

updateDashboard();

        resetFormAnggota();



        editAnggotaId = null;



        alert(
            "Data anggota diperbarui"
        );



    }catch(error){


        alert(
            "Update gagal"
        );


    }

}





/* =====================================================
   HAPUS ANGGOTA
===================================================== */

async function hapusAnggota(
    firestoreId
){


    const yakin =

    confirm(

        "Hapus data anggota ini?"

    );



    if(!yakin)
    return;




    try{


        await hapusAnggotaFirebase(

            firestoreId

        );



        DATA.anggota =

        DATA.anggota.filter(item =>

            item.firestoreId
            !== firestoreId

        );



        tampilAnggota();

updateDashboard();

        alert(
            "Data anggota dihapus"
        );



    }catch(error){


        alert(
            "Gagal menghapus data"
        );


    }

}
