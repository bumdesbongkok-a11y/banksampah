/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : anggota.firebase.js

   Fungsi :
   - CRUD data anggota Firebase Firestore
===================================================== */


/* =====================================================
   IMPORT FIREBASE
   (mengikuti config.js yang sudah dibuat)
===================================================== */


/* =====================================================
   COLLECTION
===================================================== */

const COL_ANGGOTA = "colAnggota";



/* =====================================================
   LOAD DATA ANGGOTA
===================================================== */

async function loadAnggotaFirebase(){

    try{


        const snapshot =
        await db
        .collection(COL_ANGGOTA)
        .get();



        DATA.anggota = [];



        snapshot.forEach(doc=>{


            DATA.anggota.push({

                firestoreId:
                doc.id,


                ...doc.data()

            });


        });



        console.log(
            "Anggota Firebase:",
            DATA.anggota.length
        );



        return DATA.anggota;



    }catch(error){


        console.error(
            "Load anggota gagal:",
            error
        );


        return [];

    }

}





/* =====================================================
   SIMPAN ANGGOTA
===================================================== */

async function simpanAnggotaFirebase(data){


    try{


        const ref =
        await db
        .collection(COL_ANGGOTA)
        .add(data);



        return ref.id;



    }catch(error){


        console.error(
            "Simpan anggota gagal:",
            error
        );


        throw error;

    }

}





/* =====================================================
   UPDATE ANGGOTA
===================================================== */

async function updateAnggotaFirebase(
    firestoreId,
    data
){


    try{


        await db
        .collection(COL_ANGGOTA)
        .doc(firestoreId)
        .update(data);



    }catch(error){


        console.error(
            "Update anggota gagal:",
            error
        );


        throw error;

    }

}





/* =====================================================
   HAPUS ANGGOTA
===================================================== */

async function hapusAnggotaFirebase(
    firestoreId
){


    try{


        await db
        .collection(COL_ANGGOTA)
        .doc(firestoreId)
        .delete();



    }catch(error){


        console.error(
            "Hapus anggota gagal:",
            error
        );


        throw error;

    }

}