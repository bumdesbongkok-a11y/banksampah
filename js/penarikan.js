/* =====================================================
   INIT
===================================================== */

async function initPenarikan(){

    console.log(
        "initPenarikan berjalan"
    );

    resetFormPenarikan();

    await loadPenarikanFirebase();

    isiDropdownRWTarik();

    isiDropdownAnggotaTarik();
	
	isiDropdownFilterAnggotaTarik();

    tampilPenarikan();
	
	updateDashboard();

    eventPenarikan();

}

/* =====================================================
   EVENT
===================================================== */

function eventPenarikan(){

    el("txtTanggalTarik")
    .addEventListener(
        "change",
        ()=>{

            setValue(

                "txtHariTarik",

                getNamaHari(

                    getValue(
                        "txtTanggalTarik"
                    )

                )

            );

        }
    );



    el("cmbRWTarik")
    .addEventListener(
        "change",
        ()=>{

            isiDropdownAnggotaTarik();

            setValue(
                "txtSaldoTarik",
                ""
            );

        }
    );



    el("cmbAnggotaTarik")
    .addEventListener(
        "change",
        tampilSaldoTarik
    );



    el("btnSimpanTarik")
    .addEventListener(
        "click",
        simpanPenarikan
    );



    el("btnUpdateTarik")
    .addEventListener(
        "click",
        updatePenarikan
    );



    el("btnBatalTarik")
    .addEventListener(
        "click",
        resetFormPenarikan
    );



    el("txtFilterTarik")
    .addEventListener(
        "change",
        tampilPenarikan
    );



    el("cmbRWFilterTarik")
    .addEventListener(
        "change",
        tampilPenarikan
    );



    el("cmbFilterAnggotaTarik")
    .addEventListener(
        "change",
        tampilPenarikan
    );

el("cmbRWTarik")
.addEventListener(
    "change",
    isiDropdownAnggotaTarik
);

el("cmbRWFilterTarik")
.addEventListener(
    "change",
    ()=>{

        isiDropdownFilterAnggotaTarik();

        tampilPenarikan();

    }
);

el("cmbFilterAnggotaTarik")
.addEventListener(
    "change",
    tampilPenarikan
);

el("txtFilterTarik")
.addEventListener(
    "change",
    tampilPenarikan
);

}

/* =====================================================
   HITUNG SALDO
===================================================== */

function hitungSaldoAnggota(idAnggota){

    let totalSetoran = 0;

    let totalTarik = 0;



    DATA.setoran.forEach(item=>{

        if(item.idAnggota===idAnggota){

            totalSetoran +=
            Number(item.total);

        }

    });



    DATA.penarikan.forEach(item=>{

        if(item.idAnggota===idAnggota){

            totalTarik +=
            Number(item.nominal);

        }

    });



    return totalSetoran-totalTarik;

}

/* =====================================================
   SIMPAN
===================================================== */

async function simpanPenarikan(){

    const saldo =

    Number(

        getValue(
            "txtSaldoTarik"
        )

    );



    const nominal =

    Number(

        getValue(
            "txtNominalTarik"
        )

    );



    if(nominal<=0){

        alert(

            "Nominal belum diisi."

        );

        return;

    }



    if(nominal>saldo){

        alert(

            "Saldo anggota tidak mencukupi."

        );

        return;

    }



    const idAnggota =

    getValue(
        "cmbAnggotaTarik"
    );



    const anggota =

    DATA.anggota.find(item=>

        item.firestoreId===idAnggota

    );



    const data = {

        tanggal :
        getValue(
            "txtTanggalTarik"
        ),

        hari :
        getValue(
            "txtHariTarik"
        ),

        rw :
        getValue(
            "cmbRWTarik"
        ),

        idAnggota,

        nama :

anggota ? anggota.nama : "",

        nominal

    };



    const sukses =

await simpanPenarikanFirebase(data);


if(!sukses) return;


tampilPenarikan();


updateDashboard();


resetFormPenarikan();

}

/* =====================================================
   EDIT
===================================================== */

function editPenarikan(firestoreId){

    const data =

    DATA.penarikan.find(item=>

        item.firestoreId===firestoreId

    );

    if(!data) return;

    EDIT.penarikan =
    firestoreId;

    setValue(

        "txtTanggalTarik",

        data.tanggal

    );

    setValue(

        "txtHariTarik",

        data.hari

    );

    setValue(

        "cmbRWTarik",

        data.rw

    );

    isiDropdownAnggotaTarik();

    setValue(

        "cmbAnggotaTarik",

        data.idAnggota

    );

    tampilSaldoTarik();

    setValue(

        "txtNominalTarik",

        data.nominal

    );

    disable(

        "btnSimpanTarik"

    );

    enable(

        "btnUpdateTarik"

    );

    enable(

        "btnBatalTarik"

    );

}

/* =====================================================
   UPDATE
===================================================== */

async function updatePenarikan(){

    if(!EDIT.penarikan) return;

    const idAnggota =
    getValue("cmbAnggotaTarik");

    const anggota =

    DATA.anggota.find(item=>

        item.firestoreId===idAnggota

    );

    const data = {

        tanggal :
        getValue("txtTanggalTarik"),

        hari :
        getValue("txtHariTarik"),

        rw :
        getValue("cmbRWTarik"),

        idAnggota,

        nama :
        anggota.nama,

        nominal :
        Number(
            getValue("txtNominalTarik")
        )

    };

    const sukses =

    await updatePenarikanFirebase(

        EDIT.penarikan,

        data

    );

    if(!sukses) return;

    const index =

    DATA.penarikan.findIndex(item=>

        item.firestoreId===EDIT.penarikan

    );

    if(index>=0){

        DATA.penarikan[index]={

            firestoreId:

            EDIT.penarikan,

            ...data

        };

    }

    EDIT.penarikan=null;

    tampilPenarikan();
	updateDashboard();
    resetFormPenarikan();

}

/* =====================================================
   HAPUS
===================================================== */

async function hapusPenarikan(firestoreId){

    const yakin=

    confirm(

        "Hapus data penarikan?"

    );

    if(!yakin) return;

    const sukses=

await hapusPenarikanFirebase(
    firestoreId
);


if(!sukses) return;





tampilPenarikan();


updateDashboard();

}