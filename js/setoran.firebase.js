/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : setoran.firebase.js

   Fungsi :
   - CRUD Setoran Firebase
===================================================== */



/* =====================================================
   COLLECTION
===================================================== */

const COL_SETORAN = "colSetoran";



/* =====================================================
   LOAD SETORAN
===================================================== */

async function loadSetoranFirebase(){


    try{


        const snapshot =

        await db
        .collection(COL_SETORAN)
        .get();



        DATA.setoran = [];



        snapshot.forEach(doc=>{


            DATA.setoran.push({


                firestoreId:

                doc.id,


                ...doc.data()


            });


        });



        console.log(

            "Setoran Firebase:",

            DATA.setoran.length

        );



        return DATA.setoran;



    }catch(error){


        console.error(

            "Load setoran gagal:",

            error

        );


        return [];

    }


}





/* =====================================================
   SIMPAN SETORAN
===================================================== */

async function simpanSetoranFirebase(data){


    try{


        const ref =

        await db
        .collection(COL_SETORAN)
        .add(data);



        return ref.id;



    }catch(error){


        console.error(

            "Simpan setoran gagal:",

            error

        );


        throw error;


    }

}





/* =====================================================
   UPDATE SETORAN
===================================================== */

async function updateSetoranFirebase(

    firestoreId,

    data

){


    try{


        await db
        .collection(COL_SETORAN)
        .doc(firestoreId)
        .update(data);



    }catch(error){


        console.error(

            "Update setoran gagal:",

            error

        );


        throw error;


    }

}





/* =====================================================
   HAPUS SETORAN
===================================================== */

async function hapusSetoranFirebase(

    firestoreId

){


    try{


        await db
        .collection(COL_SETORAN)
        .doc(firestoreId)
        .delete();



    }catch(error){


        console.error(

            "Hapus setoran gagal:",

            error

        );


        throw error;


    }

}