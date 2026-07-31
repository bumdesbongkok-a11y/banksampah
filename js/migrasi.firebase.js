/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : migrasi.firebase.js

   Fungsi :
   - Backup seluruh data Firebase
   - Restore seluruh data Firebase
===================================================== */



/* =====================================================
   DAFTAR COLLECTION
===================================================== */

const KOLEKSI_MIGRASI = [

    "colAnggota",

    "colHarga",

    "colSetoran",

    "colPenjualan",

    "colPenarikan",

    "colOperasional"

];



async function backupFirebase(){

    try{

        const hasil = {

            aplikasi :

            "Bank Sampah Sumber Rejeki",

            versi :

            "V3",

            tanggalBackup :

            new Date().toISOString(),

            data : {}

        };

        for(const koleksi of KOLEKSI_MIGRASI){

            const snapshot =
            await db
            .collection(koleksi)
            .get();

            hasil.data[koleksi] = [];

            snapshot.forEach(doc=>{

                hasil.data[koleksi].push({

                    firestoreId :

                    doc.id,

                    ...doc.data()

                });

            });

        }

        return hasil;

    }catch(error){

        console.error(error);

        return null;

    }

}



/* =====================================================
   HAPUS ISI COLLECTION
===================================================== */

async function kosongkanCollection(namaCollection){

    const snapshot =
    await db
    .collection(namaCollection)
    .get();

    const batch =
    db.batch();

    snapshot.forEach(doc=>{

        batch.delete(doc.ref);

    });

    await batch.commit();

}



/* =====================================================
   RESTORE FIREBASE
===================================================== */

async function restoreFirebase(dataBackup){

    try{

        for(const koleksi of KOLEKSI_MIGRASI){

            await kosongkanCollection(
                koleksi
            );

            if(!dataBackup[koleksi]){

                continue;

            }

            for(const item of dataBackup[koleksi]){

                const firestoreId =
                item.firestoreId;

                const data = {

                    ...item

                };

                delete data.firestoreId;

                await db
                .collection(koleksi)
                .doc(firestoreId)
                .set(data);

            }

        }

        return true;

    }catch(error){

        console.error(

            "Restore gagal :",

            error

        );

        return false;

    }

}

/* =====================================================
   MIGRASI ANGGOTA V2 -> V3
===================================================== */

async function migrasiAnggotaV2(){

    const snapshot =
    await db
    .collection("anggota")
    .get();

    let jumlah = 0;

    for(const doc of snapshot.docs){

        const data = doc.data();

        const cek =
        await db
        .collection(COLLECTION.anggota)
        .where(
            "idAnggota",
            "==",
            data.idAnggota
        )
        .get();

        if(!cek.empty){

            continue;

        }

        await db
        .collection(COLLECTION.anggota)
        .add({

            idAnggota :
            data.idAnggota,

            nama :
            data.nama,

            rw :
            data.rw,

            tanggalDaftar :
            data.dibuat || new Date()

        });

        jumlah++;

    }

    return jumlah;

}

/* =====================================================
   MIGRASI HARGA V2 -> V3
===================================================== */

async function migrasiHargaV2(){

    const snapshot =
    await db
    .collection("harga")
    .get();

    let jumlah = 0;

    for(const doc of snapshot.docs){

        const daftarHarga =
        doc.data();

        for(const jenisBarang in daftarHarga){

            const cek =
            await db
            .collection(COLLECTION.harga)
            .where(
                "jenisBarang",
                "==",
                jenisBarang
            )
            .get();

            if(!cek.empty){

                continue;

            }

            await db
            .collection(COLLECTION.harga)
            .add({

                jenisBarang :
                jenisBarang,

                harga :
                Number(
                    daftarHarga[jenisBarang]
                )

            });

            jumlah++;

        }

    }

    return jumlah;

}

/* =====================================================
   MIGRASI OPERASIONAL V2 -> V3
===================================================== */

async function migrasiOperasionalV2(){

    const snapshot =
    await db
    .collection("operasional")
    .get();

    let jumlah = 0;

    for(const doc of snapshot.docs){

        const data =
        doc.data();

        const cek =
        await db
        .collection(COLLECTION.operasional)
        .where(
            "tanggal",
            "==",
            data.tanggal
        )
        .where(
            "kategori",
            "==",
            data.kategori
        )
        .where(
            "nominal",
            "==",
            data.nominal
        )
        .get();

        if(!cek.empty){

            continue;

        }

        await db
        .collection(COLLECTION.operasional)
        .add({

            tanggal :

            data.tanggal,

            hari :

            data.hari,

            kategori :

            data.kategori,

            uraian :

            data.keterangan || "",

            nominal :

            Number(
                data.nominal
            ),

            waktuInput :

            data.createdAt ||

            new Date()

        });

        jumlah++;

    }

    return jumlah;

}

/* =====================================================
   MIGRASI PENJUALAN V2 -> V3
===================================================== */

async function migrasiPenjualanV2(){

    const snapshot =
    await db
    .collection("penjualan")
    .get();

    let jumlah = 0;

    for(const doc of snapshot.docs){

        const data = doc.data();

        const cek =
        await db
        .collection(COLLECTION.penjualan)
        .where("tanggal","==",data.tanggal)
        .where("jenisBarang","==",data.barang)
        .where("total","==",Number(data.total))
        .get();

        if(!cek.empty){

            continue;

        }

        await db
        .collection(COLLECTION.penjualan)
        .add({

            tanggal :
            data.tanggal,

            hari :
            data.hari,

            jenisBarang :
            data.barang,

            berat :
            Number(data.berat),

            harga :
            Number(data.harga),

            total :
            Number(data.total),

            pembeli :
            data.pembeli || "",

            keterangan :
            data.keterangan || "",

            waktuInput :
            data.dibuat || new Date()

        });

        jumlah++;

    }

    return jumlah;

}

/* =====================================================
   MIGRASI SETORAN V2 -> V3
===================================================== */

async function migrasiSetoranV2(){
let gagalSetoran = [];
    const snapshot =
    await db
    .collection("setoran")
    .get();

    let jumlah = 0;

    for(const doc of snapshot.docs){

        const data = doc.data();

        /* Cari anggota berdasarkan nomor anggota lama */

        const anggota =
        await db
        .collection(COLLECTION.anggota)
        .where(
            "idAnggota",
            "==",
            data.idAnggota
        )
        .limit(1)
        .get();

        if(anggota.empty){

    gagalSetoran.push({

        alasan:"Anggota tidak ditemukan",

        data:data

    });

    continue;

}

        const firestoreId =
        anggota.docs[0].id;

        /* Cari barang */

        const harga =
        await db
        .collection(COLLECTION.harga)
        .where(
            "jenisBarang",
            "==",
            data.barang
        )
        .limit(1)
        .get();

        if(harga.empty){

    gagalSetoran.push({

        alasan:"Barang tidak ditemukan",

        data:data

    });

    continue;

}

        /* Cek apakah sudah pernah dimigrasikan */

        const cek =
        await db
        .collection(COLLECTION.setoran)
        .where(
            "tanggal",
            "==",
            data.tanggal
        )
        .where(
            "idAnggota",
            "==",
            firestoreId
        )
        .where(
            "jenisBarang",
            "==",
            data.barang
        )
        .where(
            "total",
            "==",
            Number(data.total)
        )
        .get();

        if(!cek.empty){

    gagalSetoran.push({

        alasan:"Duplikat",

        data:data

    });

    continue;

}

        await db
        .collection(COLLECTION.setoran)
        .add({

            tanggal :

            data.tanggal,

            hari :

            data.hari,

            rw :

            data.rw,

            idAnggota :

            firestoreId,

            namaAnggota :

            data.nama,

            jenisBarang :

            data.barang,

            berat :

            Number(data.berat),

            harga :

            Number(data.harga),

            total :

            Number(data.total),

            waktuInput :

            data.dibuat ||

            new Date()

        });

        jumlah++;

    }
	
	console.table(
    gagalSetoran
);

    return jumlah;

}