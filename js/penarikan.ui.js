/* =====================================================
   TABEL PENARIKAN
===================================================== */

function tampilPenarikan(){

    const tbody =

    document.querySelector(

        "#tblPenarikan tbody"

    );

    if(!tbody) return;

    tbody.innerHTML = "";

    const data =

    filterPenarikan();

    if(data.length===0){

        tbody.innerHTML=

        `

        <tr>

        <td colspan="4">

        Belum ada data

        </td>

        </tr>

        `;

    }

    data.forEach((item,index)=>{

        tbody.innerHTML +=

        `

        <tr>

        <td>${item.tanggal}</td>

        <td>${item.nama}</td>

        <td>${formatRupiah(item.nominal)}</td>

        <td>

    <button

    class="btn"

    onclick="editPenarikan('${item.firestoreId}')">

        ✏️

    </button>

    <button

    class="btn"

    onclick="hapusPenarikan('${item.firestoreId}')">

        🗑️

    </button>

</td>

        </tr>

        `;

    });

    tampilDashboardPenarikan();

}


/* =====================================================
   RESET FILTER
===================================================== */

function resetFilterPenarikan(){

    setValue(
        "txtFilterTanggalAwalTarik",
        ""
    );

    setValue(
        "txtFilterTanggalAkhirTarik",
        ""
    );

    setValue(
        "cmbRWFilterTarik",
        ""
    );

    isiDropdownFilterAnggotaTarik();

    setValue(
        "cmbFilterAnggotaTarik",
        ""
    );

    tampilPenarikan();

}


/* =====================================================
   RESET FORM
===================================================== */

function resetFormPenarikan(){

    setValue(

        "txtTanggalTarik",

        new Date()

        .toISOString()

        .slice(0,10)

    );

    setValue(

        "txtHariTarik",

        getNamaHari(

            getValue("txtTanggalTarik")

        )

    );

    setValue(

        "cmbRWTarik",

        ""

    );

    setValue(

        "cmbAnggotaTarik",

        ""

    );

    setValue(

        "txtSaldoTarik",

        ""

    );

    setValue(

        "txtNominalTarik",

        ""

    );

    disable(

        "btnUpdateTarik"

    );

    disable(

        "btnBatalTarik"

    );

    enable(

        "btnSimpanTarik"

    );

}

/* =====================================================
   DASHBOARD
===================================================== */

function tampilDashboardPenarikan(){

    setText(

        "dashTotalTarik",

        DATA.penarikan.length

    );

    const total =

    DATA.penarikan.reduce(

        (jumlah,item)=>

        jumlah +

        Number(item.nominal),

        0

    );

    setText(

        "dashNominalTarik",

        formatRupiah(total)

    );

}

/* =====================================================
   DROPDOWN RW
===================================================== */

function isiDropdownRWTarik(){

    isiDropdownRW(

        "cmbRWTarik"

    );

    isiDropdownRW(

        "cmbRWFilterTarik"

    );

}

/* =====================================================
   DROPDOWN ANGGOTA
===================================================== */

function isiDropdownAnggotaTarik(){

    const select =

    el("cmbAnggotaTarik");

    if(!select) return;

    select.innerHTML =

    `

    <option value="">

    -- Pilih Anggota --

    </option>

    `;

    const rw =

    getValue("cmbRWTarik");

    DATA.anggota

    .filter(item=>{

    // Belum pilih RW
    if(!rw){

        return false;

    }

    return String(item.rw)
        .replace("RW ","")
        .trim() ===
        String(rw)
        .replace("RW ","")
        .trim();

})

    .forEach(item=>{

        select.innerHTML +=

        `

        <option value="${item.firestoreId}">

        ${item.nama}

        </option>

        `;

    });

}

/* =====================================================
   TAMPIL SALDO
===================================================== */

function tampilSaldoTarik(){

    const id =

    getValue(

        "cmbAnggotaTarik"

    );

    const saldo =

    hitungSaldoAnggota(id);

    setValue(

        "txtSaldoTarik",

        saldo

    );

}

function filterPenarikan(){

    const tanggalAwal =
getValue(
    "txtFilterTanggalAwalTarik"
);

const tanggalAkhir =
getValue(
    "txtFilterTanggalAkhirTarik"
);

const rw =
getValue(
    "cmbRWFilterTarik"
);

const anggota =
getValue(
    "cmbFilterAnggotaTarik"
);

    return DATA.penarikan.filter(item=>{

        /* =====================================================
   FILTER TANGGAL
===================================================== */

if(

    tanggalAwal ||

    tanggalAkhir

){

    if(

        tanggalAwal &&

        item.tanggal < tanggalAwal

    ){

        return false;

    }

    if(

        tanggalAkhir &&

        item.tanggal > tanggalAkhir

    ){

        return false;

    }

}

/* =====================================================
   JIKA FILTER TANGGAL KOSONG
   GUNAKAN PERIODE AKTIF
===================================================== */

else{

    const tgl =
    new Date(item.tanggal);

    if(

        tgl.getMonth() + 1 !== PERIODE.bulan ||

        tgl.getFullYear() !== PERIODE.tahun

    ){

        return false;

    }

}

        // =====================================================
        // FILTER RW
        // =====================================================

        if(
            rw &&
            item.rw !== rw
        ){

            return false;

        }

        // =====================================================
        // FILTER ANGGOTA
        // =====================================================

        if(
            anggota &&
            item.idAnggota !== anggota
        ){

            return false;

        }

        return true;

    });

}

/* =====================================================
   DROPDOWN FILTER ANGGOTA
===================================================== */

function isiDropdownFilterAnggotaTarik(){

    const select =
    el("cmbFilterAnggotaTarik");

    if(!select) return;

    select.innerHTML = `

    <option value="">

        -- Semua Anggota --

    </option>

    `;

    const rw =
    getValue("cmbRWFilterTarik");

    DATA.anggota

    .filter(item=>{

        if(!rw){

            return false;

        }

        return String(item.rw)
            .replace("RW ","")
            .trim() ===
            String(rw)
            .replace("RW ","")
            .trim();

    })

    .sort((a,b)=>

        a.nama.localeCompare(b.nama)

    )

    .forEach(item=>{

        select.innerHTML += `

        <option value="${item.firestoreId}">

            ${item.nama}

        </option>

        `;

    });

}

