/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : harga.js

   Fungsi :
   - Controller modul harga
===================================================== */


let editHargaId = null;




/* =====================================================
   INIT HARGA
===================================================== */

async function initHarga(){


    console.log(
        "initHarga berjalan"
    );



    resetFormHarga();



    await loadHargaFirebase();



    tampilHarga();



    eventHarga();


}





/* =====================================================
   EVENT HARGA
===================================================== */

function eventHarga(){



    const btnSimpan =

    el("btnSimpanHarga");



    if(btnSimpan){


        btnSimpan.onclick =

        simpanHarga;


    }





    const btnUpdate =

    el("btnUpdateHarga");



    if(btnUpdate){


        btnUpdate.onclick =

        updateHarga;


    }





    const btnBatal =

    el("btnBatalHarga");



    if(btnBatal){


        btnBatal.onclick =

        resetFormHarga;


    }





    const cari =

    el("txtCariHarga");



    if(cari){


        cari.addEventListener(

            "input",

            tampilHarga

        );


    }


}





/* =====================================================
   SIMPAN HARGA
===================================================== */

async function simpanHarga(){



    const jenisBarang =

    getValue(
        "txtJenisBarang"
    )
    .trim();



    const harga =

    getNumber(
        "txtHarga"
    );





    if(!jenisBarang){


        alert(
            "Jenis barang belum diisi"
        );


        return;

    }




    if(harga <= 0){


        alert(
            "Harga belum diisi"
        );


        return;

    }






    const data = {


        jenisBarang:



        jenisBarang,



        harga:



        harga,



        tanggalUpdate:



        new Date()


    };





    try{


        const firestoreId =

        await simpanHargaFirebase(

            data

        );



        data.firestoreId =

        firestoreId;



        DATA.harga.push(

            data

        );



        tampilHarga();



        resetFormHarga();



        alert(

            "Harga berhasil disimpan"

        );



    }catch(error){



        console.error(error);



        alert(

            "Gagal menyimpan harga"

        );


    }


}





/* =====================================================
   EDIT HARGA
===================================================== */

function editHarga(

    firestoreId

){



    const data =

    DATA.harga.find(item =>


        item.firestoreId

        === firestoreId


    );



    if(!data) return;




    editHargaId =

    firestoreId;



    isiFormHarga(

        data

    );


}





/* =====================================================
   UPDATE HARGA
===================================================== */

async function updateHarga(){



    if(!editHargaId)

    return;





    const data = {


        jenisBarang:

        getValue(

            "txtJenisBarang"

        ),



        harga:

        getNumber(

            "txtHarga"

        ),



        tanggalUpdate:

        new Date()


    };





    try{


        await updateHargaFirebase(

            editHargaId,

            data

        );



        const index =

        DATA.harga.findIndex(item =>


            item.firestoreId

            === editHargaId


        );



        if(index !== -1){


            DATA.harga[index] = {


                ...DATA.harga[index],


                ...data


            };


        }





        tampilHarga();



        resetFormHarga();



        editHargaId = null;



        alert(

            "Harga berhasil diperbarui"

        );



    }catch(error){



        console.error(error);



        alert(

            "Update harga gagal"

        );


    }


}





/* =====================================================
   HAPUS HARGA
===================================================== */

async function hapusHarga(

    firestoreId

){



    const yakin =

    confirm(

        "Hapus data harga ini?"

    );



    if(!yakin)

    return;





    try{


        await hapusHargaFirebase(

            firestoreId

        );



        DATA.harga =

        DATA.harga.filter(item =>


            item.firestoreId

            !== firestoreId


        );



        tampilHarga();



        alert(

            "Harga berhasil dihapus"

        );



    }catch(error){



        console.error(error);



        alert(

            "Gagal menghapus harga"

        );


    }


}