/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3
   File : penarikan.firebase.js
===================================================== */



/* =====================================================
   COLLECTION
===================================================== */

const COL_PENARIKAN =
"colPenarikan";



/* =====================================================
   LOAD PENARIKAN
===================================================== */

async function loadPenarikanFirebase(){

    try{

        const snapshot =
        await db
        .collection(COL_PENARIKAN)
        .orderBy("tanggal","desc")
        .get();

        DATA.penarikan = [];

        snapshot.forEach(doc=>{

            DATA.penarikan.push({

                firestoreId : doc.id,

                ...doc.data()

            });

        });

        console.log(

            "Penarikan Firebase :",

            DATA.penarikan.length

        );

        return DATA.penarikan;

    }catch(error){

        console.error(

            "Load penarikan gagal :",

            error

        );

        return [];

    }

}

/* =====================================================
   SIMPAN PENARIKAN
===================================================== */

async function simpanPenarikanFirebase(data){

    try{

        const docRef =
        await db
        .collection(COL_PENARIKAN)
        .add(data);

        data.firestoreId =
        docRef.id;

        DATA.penarikan.push(data);

        return true;

    }catch(error){

        console.error(

            "Simpan penarikan gagal :",

            error

        );

        return false;

    }

}

/* =====================================================
   UPDATE PENARIKAN
===================================================== */

async function updatePenarikanFirebase(
firestoreId,
data
){

    try{

        await db
        .collection(COL_PENARIKAN)
        .doc(firestoreId)
        .update(data);

        return true;

    }catch(error){

        console.error(

            "Update penarikan gagal :",

            error

        );

        return false;

    }

}

/* =====================================================
   HAPUS PENARIKAN
===================================================== */

async function hapusPenarikanFirebase(
firestoreId
){

    try{

        await db
        .collection(COL_PENARIKAN)
        .doc(firestoreId)
        .delete();

        DATA.penarikan =
        DATA.penarikan.filter(item=>

            item.firestoreId!==firestoreId

        );

        return true;

    }catch(error){

        console.error(

            "Hapus penarikan gagal :",

            error

        );

        return false;

    }

}