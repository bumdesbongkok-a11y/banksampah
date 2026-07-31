/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : harga.firebase.js

   Fungsi :
   - CRUD Master Harga Firebase
===================================================== */



/* =====================================================
   COLLECTION
===================================================== */

const COL_HARGA = "colHarga";





/* =====================================================
   LOAD HARGA
===================================================== */

async function loadHargaFirebase(){


    try{


        const snapshot =

        await db
        .collection(COL_HARGA)
        .get();



        DATA.harga = [];



        snapshot.forEach(doc=>{


            DATA.harga.push({


                firestoreId:
                doc.id,


                ...doc.data()


            });


        });



        console.log(

            "Harga Firebase:",

            DATA.harga.length

        );



        return DATA.harga;



    }catch(error){


        console.error(

            "Load harga gagal:",

            error

        );


        return [];

    }

}





/* =====================================================
   SIMPAN HARGA
===================================================== */

async function simpanHargaFirebase(data){


    try{


        const ref =

        await db
        .collection(COL_HARGA)
        .add(data);



        return ref.id;



    }catch(error){


        console.error(

            "Simpan harga gagal:",

            error

        );


        throw error;


    }

}





/* =====================================================
   UPDATE HARGA
===================================================== */

async function updateHargaFirebase(

    firestoreId,

    data

){


    try{


        await db
        .collection(COL_HARGA)
        .doc(firestoreId)
        .update(data);



    }catch(error){


        console.error(

            "Update harga gagal:",

            error

        );


        throw error;


    }

}





/* =====================================================
   HAPUS HARGA
===================================================== */

async function hapusHargaFirebase(

    firestoreId

){


    try{


        await db
        .collection(COL_HARGA)
        .doc(firestoreId)
        .delete();



    }catch(error){


        console.error(

            "Hapus harga gagal:",

            error

        );


        throw error;


    }

}