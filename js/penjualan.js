/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3
   File : penjualan.js
   Fungsi : Controller Penjualan
===================================================== */



let editPenjualanId = null;



/* =====================================================
   INIT
===================================================== */

async function initPenjualan(){

    

    resetFormPenjualan();
	 
    await loadPenjualanFirebase();

    isiDropdownBarangJual();

    tampilPenjualan();
	
	updateDashboard();

    eventPenjualan();


}



/* =====================================================
   EVENT
===================================================== */

function eventPenjualan(){

    el("btnSimpanJual")
    .onclick = simpanPenjualan;


    el("btnUpdateJual")
    .onclick = updatePenjualan;


    el("btnBatalJual")
    .onclick = batalPenjualan;


    el("cmbJenisBarangJual")
    .onchange = pilihHargaJual;


    el("txtBeratJual")
    .oninput = hitungTotalJual;


    el("txtHargaJual")
    .oninput = hitungTotalJual;


    el("txtTanggalJual")
    .onchange = ()=>{

        setValue(

            "txtHariJual",

            getNamaHari(

                getValue(

                    "txtTanggalJual"

                )

            )

        );

    };
el("txtFilterTanggalJual")
.addEventListener(
    "change",
    tampilPenjualan
);
}



/* =====================================================
   SIMPAN
===================================================== */

async function simpanPenjualan(){

    const idBarang =
    getValue("cmbJenisBarangJual");


    if(idBarang===""){

        alert(
            "Pilih jenis barang."
        );

        return;

    }


    const barang =
    DATA.harga.find(item=>

        item.firestoreId===idBarang

    );


    const data={

        tanggal :

        getValue("txtTanggalJual"),

        hari :

        getValue("txtHariJual"),

        jenisBarang :

        barang.jenisBarang,

        berat :

        getNumber("txtBeratJual"),

        harga :

        getNumber("txtHargaJual"),

        total :

        getNumber("txtTotalJual"),

        waktuInput :

        new Date()

    };


    try{

        const firestoreId=

        await simpanPenjualanFirebase(

            data

        );


        data.firestoreId=
        firestoreId;


        DATA.penjualan.push(
            data
        );


        tampilPenjualan();
		updateDashboard();
        resetFormPenjualan();

        alert(
            "Penjualan berhasil disimpan."
        );

    }

    catch(error){

        console.error(error);

        alert(
            "Gagal menyimpan."
        );

    }

}



/* =====================================================
   EDIT
===================================================== */

function editPenjualan(firestoreId){

    const data=
    DATA.penjualan.find(item=>

        item.firestoreId===firestoreId

    );

    if(!data) return;


    editPenjualanId=
    firestoreId;


    setValue(
        "txtTanggalJual",
        data.tanggal
    );

    setValue(
        "txtHariJual",
        data.hari
    );


    const barang=
    DATA.harga.find(item=>

        item.jenisBarang===data.jenisBarang

    );

    if(barang){

        setValue(

            "cmbJenisBarangJual",

            barang.firestoreId

        );

    }


    setValue(
        "txtBeratJual",
        data.berat
    );

    setValue(
        "txtHargaJual",
        data.harga
    );

    setValue(
        "txtTotalJual",
        data.total
    );


    disable(
        "btnSimpanJual"
    );

    enable(
        "btnUpdateJual"
    );

    enable(
        "btnBatalJual"
    );

}



/* =====================================================
   UPDATE
===================================================== */

async function updatePenjualan(){

    if(!editPenjualanId)
    return;


    const barang=
    DATA.harga.find(item=>

        item.firestoreId===

        getValue("cmbJenisBarangJual")

    );


    const data={

        tanggal :

        getValue("txtTanggalJual"),

        hari :

        getValue("txtHariJual"),

        jenisBarang :

barang ? barang.jenisBarang : "",

        berat :

        getNumber("txtBeratJual"),

        harga :

        getNumber("txtHargaJual"),

        total :

        getNumber("txtTotalJual"),

        waktuUpdate :

        new Date()

    };


    try{

        await updatePenjualanFirebase(

            editPenjualanId,

            data

        );


        await loadPenjualanFirebase();

        tampilPenjualan();
	updateDashboard();
        batalPenjualan();

    }

    catch(error){

        console.error(error);

        alert(
            "Update gagal."
        );

    }

}



/* =====================================================
   HAPUS
===================================================== */

async function hapusPenjualan(firestoreId){

    const yakin=
    confirm(
        "Hapus data penjualan?"
    );

    if(!yakin) return;


    try{

        await hapusPenjualanFirebase(
            firestoreId
        );


        DATA.penjualan =

DATA.penjualan.filter(item=>

    item.firestoreId!==firestoreId

);


tampilPenjualan();

updateDashboard();

    }

    catch(error){

        console.error(error);

        alert(
            "Hapus gagal."
        );

    }

}



/* =====================================================
   BATAL
===================================================== */

function batalPenjualan(){

    editPenjualanId=null;

    resetFormPenjualan();

}