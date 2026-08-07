/* =====================================================
   KAS FIREBASE
===================================================== */

const COL_KAS =
"colKas";


/* =====================================================
   LOAD
===================================================== */

async function loadKasFirebase(){

    try{

        const snapshot =
        await db
        .collection(
            COL_KAS
        )
        .orderBy(
            "tanggal",
            "asc"
        )
        .get();

        DATA.kas =

        snapshot.docs.map(doc=>({

            id : doc.id,

            ...doc.data()

        }));

        console.log(

            "Kas Firebase :",

            DATA.kas.length

        );

tampilKas();

    }

    catch(err){

        console.error(

            "Load Kas gagal :",

            err

        );

        DATA.kas = [];

    }

}


/* =====================================================
   SIMPAN
===================================================== */

async function simpanKasFirebase(data){

    await db
    .collection(
        COL_KAS
    )
    .add(data);

}


/* =====================================================
   UPDATE
===================================================== */

async function updateKasFirebase(id,data){

    await db
    .collection(
        COL_KAS
    )
    .doc(id)
    .update(data);

}


/* =====================================================
   HAPUS
===================================================== */

async function hapusKasFirebase(id){

    await db
    .collection(
        COL_KAS
    )
    .doc(id)
    .delete();

}