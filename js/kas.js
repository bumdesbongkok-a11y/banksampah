/* =====================================================
   KAS
===================================================== */

let idKas = null;


/* =====================================================
   INIT
===================================================== */

async function initKas(){

    eventKas();

    resetKas();

    await loadKasFirebase();

    tampilKas();

}


/* =====================================================
   EVENT
===================================================== */

function eventKas(){

    el("txtTanggalKas")
    .onchange = isiHariKas;

    el("btnSimpanKas")
    .onclick = simpanKas;

    el("btnUpdateKas")
    .onclick = updateKas;

    el("btnBatalKas")
    .onclick = resetKas;

    el("btnFilterKas")
    .onclick = filterKas;

    el("btnResetFilterKas")
    .onclick = resetFilterKas;

}


/* =====================================================
   ISI HARI
===================================================== */

function isiHariKas(){

    const tanggal =

    getValue(
        "txtTanggalKas"
    );

    if(!tanggal){

        setValue(
            "txtHariKas",
            ""
        );

        return;

    }

    setValue(

        "txtHariKas",

        getNamaHari(

            tanggal

        )

    );

}


/* =====================================================
   SIMPAN
===================================================== */

async function simpanKas(){

    const data = {

        tanggal :

        getValue(
            "txtTanggalKas"
        ),

        hari :

        getValue(
            "txtHariKas"
        ),

        jenis :

        getValue(
            "cmbJenisKas"
        ),

        kategori :

        getValue(
            "cmbKategoriKas"
        ),

        uraian :

        getValue(
            "txtUraianKas"
        ),

        nominal :

        Number(

            getValue(
                "txtNominalKas"
            )

        )

    };
	
	const saldo = hitungSaldoKas();

if(

    data.jenis == "Keluar"

    &&

    data.nominal > saldo

){

    alert(

        "Saldo kas tidak mencukupi."

    );

    return;

}

    await simpanKasFirebase(
        data
    );

    await loadKasFirebase();

    tampilKas();

    resetKas();

}


/* =====================================================
   EDIT
===================================================== */

function editKas(id){

    const data =

    DATA.kas.find(

        item=>item.id==id

    );

    if(!data) return;

    idKas = id;

    setValue(
        "txtTanggalKas",
        data.tanggal
    );

    setValue(
        "txtHariKas",
        data.hari
    );

    setValue(
        "cmbJenisKas",
        data.jenis
    );

    setValue(
        "cmbKategoriKas",
        data.kategori
    );

    setValue(
        "txtUraianKas",
        data.uraian
    );

    setValue(
        "txtNominalKas",
        data.nominal
    );

    el("btnSimpanKas").disabled = true;

    el("btnUpdateKas").disabled = false;

    el("btnBatalKas").disabled = false;

}


/* =====================================================
   UPDATE
===================================================== */

async function updateKas(){

    if(!idKas) return;

    const data = {

        tanggal :

        getValue(
            "txtTanggalKas"
        ),

        hari :

        getValue(
            "txtHariKas"
        ),

        jenis :

        getValue(
            "cmbJenisKas"
        ),

        kategori :

        getValue(
            "cmbKategoriKas"
        ),

        uraian :

        getValue(
            "txtUraianKas"
        ),

        nominal :

        Number(

            getValue(
                "txtNominalKas"
            )

        )

    };
	
	const saldo = hitungSaldoKasTanpa(idKas);

if(

    data.jenis == "Keluar"

){

    if(data.nominal > saldo){

        alert(

            "Saldo kas tidak mencukupi."

        );

        return;

    }

}

    await updateKasFirebase(

        idKas,

        data

    );

    await loadKasFirebase();

    tampilKas();

    resetKas();

}


/* =====================================================
   HAPUS
===================================================== */

async function hapusKas(id){

    if(

        !confirm(

            "Hapus transaksi kas?"

        )

    ) return;

    await hapusKasFirebase(id);

    await loadKasFirebase();

    tampilKas();

}


/* =====================================================
   RESET
===================================================== */

function resetKas(){

    idKas = null;

    setValue("txtTanggalKas","");
    setValue("txtHariKas","");
    setValue("cmbJenisKas","Masuk");
    setValue("cmbKategoriKas","");
    setValue("txtUraianKas","");
    setValue("txtNominalKas","");

    el("btnSimpanKas").disabled = false;
    el("btnUpdateKas").disabled = true;
    el("btnBatalKas").disabled = true;

}


/* =====================================================
   FILTER
===================================================== */

function filterKas(){

    tampilKas();

}


/* =====================================================
   RESET FILTER
===================================================== */

function resetFilterKas(){

    setValue(
        "txtFilterTanggalAwalKas",
        ""
    );

    setValue(
        "txtFilterTanggalAkhirKas",
        ""
    );

    tampilKas();

}

/* =====================================================
   HITUNG SALDO KAS
===================================================== */

function hitungSaldoKas(data = DATA.kas){

    let saldo = 0;

    data.forEach(item=>{

        if(item.jenis == "Masuk"){

            saldo += Number(item.nominal);

        }else{

            saldo -= Number(item.nominal);

        }

    });

    return saldo;

}

/* =====================================================
   HITUNG SALDO TANPA 1 TRANSAKSI
===================================================== */

function hitungSaldoKasTanpa(id){

    let saldo = 0;

    DATA.kas
    .filter(item=>item.id != id)
    .forEach(item=>{

        if(item.jenis == "Masuk"){

            saldo += Number(item.nominal);

        }else{

            saldo -= Number(item.nominal);

        }

    });

    return saldo;

}