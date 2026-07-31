/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : migrasi.js

   Fungsi :
   - Controller modul migrasi
===================================================== */



let fileBackup = null;



/* =====================================================
   INIT MIGRASI
===================================================== */

function initMigrasi(){

    console.log(

        "initMigrasi berjalan"

    );

    tampilInfoMigrasi();

    statusMigrasi(

        "Siap."

    );

    eventMigrasi();

}



/* =====================================================
   EVENT
===================================================== */

function eventMigrasi(){

    const btnBackup =

    el("btnBackupMigrasi");

    if(btnBackup){

        btnBackup.onclick =

        backupData;

    }



    const btnPilih =

    el("btnPilihFile");

    if(btnPilih){

        btnPilih.onclick =

        pilihFileMigrasi;

    }



    const file =

    el("fileMigrasi");

    if(file){

        file.onchange =

        tampilNamaFileMigrasi;

    }



    const btnRestore =

    el("btnRestoreMigrasi");

    if(btnRestore){

        btnRestore.onclick =

        restoreData;

    }

}



/* =====================================================
   BACKUP
===================================================== */

async function backupData(){

    statusMigrasi(

        "Membuat backup..."

    );

    const data =

    await backupFirebase();

    if(!data){

        statusMigrasi(

            "Backup gagal."

        );

        return;

    }



    const json =

    JSON.stringify(

        data,

        null,

        2

    );



    const blob =

    new Blob(

        [json],

        {

            type:

            "application/json"

        }

    );



    const url =

    URL.createObjectURL(

        blob

    );



    const a =

    document.createElement("a");



    a.href = url;

    a.download =

    "backup-bank-sampah.json";



    a.click();



    URL.revokeObjectURL(

        url

    );



    statusMigrasi(

        "Backup selesai."

    );

}



/* =====================================================
   RESTORE
===================================================== */

async function restoreData(){

    const yakin = confirm(

        "Restore akan mengganti seluruh data yang ada.\n\nLanjutkan?"

    );

    if(!yakin){

        return;

    }

    statusMigrasi(

        "Membuat backup otomatis..."

    );

    const backupLama =

    await backupFirebase();

    if(!backupLama){

        alert(

            "Backup otomatis gagal."

        );

        return;

    }

    downloadBackup(

        backupLama,

        "backup-sebelum-restore.json"

    );



    const file =

    el("fileMigrasi")

    .files[0];



    if(!file){

        alert(

            "Pilih file backup."

        );

        return;

    }



    const reader =

    new FileReader();



    reader.onload =

    async function(event){

        try{

            const data =

            JSON.parse(

                event.target.result

            );



            statusMigrasi(

                "Restore berjalan..."

            );



            const berhasil =

            await restoreFirebase(

                data

            );



            if(!berhasil){

                statusMigrasi(

                    "Restore gagal."

                );

                return;

            }



            statusMigrasi(

                "Restore berhasil."

            );



            alert(

                "Restore selesai.\nSilakan refresh aplikasi."

            );



        }catch(error){

            console.error(error);



            statusMigrasi(

                "File tidak valid."

            );

        }

    };



    reader.readAsText(file);

}

function downloadBackup(

    data,

    namaFile

){

    const json =

    JSON.stringify(

        data,

        null,

        2

    );

    const blob =

    new Blob(

        [json],

        {

            type :

            "application/json"

        }

    );

    const url =

    URL.createObjectURL(

        blob

    );

    const a =

    document.createElement(

        "a"

    );

    a.href = url;

    a.download = namaFile;

    a.click();

    URL.revokeObjectURL(

        url

    );

}

const btnMigrasiV2 =

el("btnMigrasiV2");

if(btnMigrasiV2){

    btnMigrasiV2.onclick =

    migrasiV2;

}

/* =====================================================
   MIGRASI V2
===================================================== */

async function migrasiV2(){

    if(!confirm(
        "Migrasi data V2 ke V3?"
    )) return;

    statusMigrasi(
        "Migrasi anggota..."
    );

    const anggota =
    await migrasiAnggotaV2();

    statusMigrasi(

        "Anggota berhasil : " +

        anggota

    );

    alert(

        "Migrasi anggota selesai."

    );
	
statusMigrasi(

    "Migrasi harga..."

);

const harga =

await migrasiHargaV2();

statusMigrasi(

    "Harga berhasil : " +

    harga

);

statusMigrasi(

    "Migrasi operasional..."

);

const operasional =

await migrasiOperasionalV2();

statusMigrasi(

    "Operasional berhasil : " +

    operasional

);

statusMigrasi(
    "Migrasi penjualan..."
);

const penjualan =
await migrasiPenjualanV2();

statusMigrasi(
    "Penjualan berhasil : " +
    penjualan
);

statusMigrasi(

    "Migrasi setoran..."

);

const setoran =

await migrasiSetoranV2();

statusMigrasi(

    "Setoran berhasil : " +

    setoran

);

}

