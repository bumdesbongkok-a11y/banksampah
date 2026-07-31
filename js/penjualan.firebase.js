/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3
   File : penjualan.firebase.js
   Fungsi : CRUD Penjualan Firebase
===================================================== */



/* =====================================================
   COLLECTION
===================================================== */

const COL_PENJUALAN = "colPenjualan";



/* =====================================================
   LOAD PENJUALAN
===================================================== */

async function loadPenjualanFirebase(){

    try{

        const snapshot =
        await db
        .collection(COL_PENJUALAN)
        .orderBy("tanggal","desc")
        .get();


        DATA.penjualan = [];


        snapshot.forEach(doc=>{

            DATA.penjualan.push({

                firestoreId : doc.id,

                ...doc.data()

            });

        });


        console.log(

            "Penjualan Firebase :",

            DATA.penjualan.length

        );


        return DATA.penjualan;

    }

    catch(error){

        console.error(

            "Load Penjualan gagal :",

            error

        );

        return [];

    }

}



/* =====================================================
   SIMPAN PENJUALAN
===================================================== */

async function simpanPenjualanFirebase(data){

    try{

        const ref =

        await db
        .collection(COL_PENJUALAN)
        .add(data);


        return ref.id;

    }

    catch(error){

        console.error(

            "Simpan Penjualan gagal :",

            error

        );

        throw error;

    }

}



/* =====================================================
   UPDATE PENJUALAN
===================================================== */

async function updatePenjualanFirebase(

    firestoreId,

    data

){

    try{

        await db

        .collection(COL_PENJUALAN)

        .doc(firestoreId)

        .update(data);

    }

    catch(error){

        console.error(

            "Update Penjualan gagal :",

            error

        );

        throw error;

    }

}



/* =====================================================
   HAPUS PENJUALAN
===================================================== */

async function hapusPenjualanFirebase(

    firestoreId

){

    try{

        await db

        .collection(COL_PENJUALAN)

        .doc(firestoreId)

        .delete();

    }

    catch(error){

        console.error(

            "Hapus Penjualan gagal :",

            error

        );

        throw error;

    }

}