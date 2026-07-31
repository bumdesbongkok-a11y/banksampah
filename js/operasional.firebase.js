
/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : operasional.firebase.js
===================================================== */



/* =====================================================
   COLLECTION
===================================================== */

const COL_OPERASIONAL =
"colOperasional";



/* =====================================================
   LOAD OPERASIONAL
===================================================== */

async function loadOperasionalFirebase(){

    try{

        const snapshot =
        await db
        .collection(COL_OPERASIONAL)
        .orderBy("tanggal","desc")
        .get();


        DATA.operasional = [];


        snapshot.forEach(doc=>{

            DATA.operasional.push({

                firestoreId : doc.id,

                ...doc.data()

            });

        });


        console.log(

            "Operasional Firebase :",

            DATA.operasional.length

        );


        return DATA.operasional;


    }catch(error){

        console.error(

            "Load operasional gagal :",

            error

        );

        return [];

    }

}



/* =====================================================
   SIMPAN OPERASIONAL
===================================================== */

async function simpanOperasionalFirebase(data){

    try{

        const docRef =
        await db
        .collection(COL_OPERASIONAL)
        .add(data);

        data.firestoreId =
        docRef.id;

        DATA.operasional.push(data);

        return true;

    }catch(error){

        console.error(

            "Simpan operasional gagal :",

            error

        );

        return false;

    }

}



/* =====================================================
   UPDATE OPERASIONAL
===================================================== */

async function updateOperasionalFirebase(
firestoreId,
data
){

    try{

        await db
        .collection(COL_OPERASIONAL)
        .doc(firestoreId)
        .update(data);

        return true;

    }catch(error){

        console.error(

            "Update operasional gagal :",

            error

        );

        return false;

    }

}



/* =====================================================
   HAPUS OPERASIONAL
===================================================== */

async function hapusOperasionalFirebase(
firestoreId
){

    try{

        await db
        .collection(COL_OPERASIONAL)
        .doc(firestoreId)
        .delete();

        DATA.operasional =
        DATA.operasional.filter(item=>

            item.firestoreId!==firestoreId

        );

        return true;

    }catch(error){

        console.error(

            "Hapus operasional gagal :",

            error

        );

        return false;

    }

}

