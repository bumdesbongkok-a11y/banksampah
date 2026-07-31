/* =====================================================
   RESET FILTER
===================================================== */

function resetFilterLaporan(){

    setValue(

        "lapTanggalAwal",

        ""

    );

    setValue(

        "lapTanggalAkhir",

        ""

    );

    setValue(

        "lapRW",

        ""

    );

    setValue(

        "lapAnggota",

        ""

    );

    setValue(

        "cmbJenisLaporan",

        "setoran"

    );

}

/* =====================================================
   DROPDOWN ANGGOTA LAPORAN
===================================================== */

function isiDropdownLaporanAnggota(){

    const select =

    el("lapAnggota");

    if(!select) return;

    select.innerHTML =

    `

    <option value="">

        Semua Anggota

    </option>

    `;

    const rw =

    getValue("lapRW");

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

        select.innerHTML +=

        `

        <option value="${item.firestoreId}">

            ${item.nama}

        </option>

        `;

    });

}

/* =====================================================
   FILTER
===================================================== */

function filterLaporan(data){

    const tglAwal =
    getValue("lapTanggalAwal");

    const tglAkhir =
    getValue("lapTanggalAkhir");

    const rw =
    getValue("lapRW");

    const anggota =
    getValue("lapAnggota");

    return data.filter(item=>{

        if(

            tglAwal &&

            item.tanggal < tglAwal

        ) return false;

        if(

            tglAkhir &&

            item.tanggal > tglAkhir

        ) return false;

        if(rw){

    const anggota =

    getAnggota(

        item.idAnggota

    );

    if(!anggota){

        return false;

    }

    if(

        String(anggota.rw)
        .replace("RW ","")
        .trim() !==

        String(rw)
        .replace("RW ","")
        .trim()

    ){

        return false;

    }

}

        if(

            anggota &&

            item.idAnggota !== anggota

        ) return false;

        return true;

    });

}

/* =====================================================
   TAMPIL LAPORAN
===================================================== */

function tampilLaporan(){

    const jenis =
    getValue("cmbJenisLaporan");

    switch(jenis){

        case "setoran":

            tampilLaporanSetoran();

            break;

        case "penjualan":

            tampilLaporanPenjualan();

            break;

        case "penarikan":

            tampilLaporanPenarikan();

            break;

        case "saldo":

            tampilLaporanSaldo();

            break;

        case "rw":

            tampilLaporanRW();

            break;

    }

}

/* =====================================================
   HEADER SETORAN
===================================================== */

function headerLaporanSetoran(){

    const thead =

    document.querySelector(

        "#tblLaporan thead"

    );

    thead.innerHTML =

    `
    <tr>

        <th>Tanggal</th>

        <th>RW</th>

        <th>ID</th>

        <th>Nama</th>

        <th>Barang</th>

        <th>Berat</th>

        <th>Harga</th>

        <th>Total</th>

    </tr>
    `;

}

/* =====================================================
   LAPORAN SETORAN
===================================================== */

function tampilLaporanSetoran(){

    headerLaporanSetoran();

    const tbody =

    document.querySelector(

        "#tblLaporan tbody"

    );

    tbody.innerHTML="";

    const data =

    filterLaporan(

        DATA.setoran

    );

    if(data.length===0){

        tbody.innerHTML=

        `
        <tr>

        <td colspan="8">

        Tidak ada data.

        </td>

        </tr>
        `;

        return;

    }

    data.forEach(item=>{
		
		const anggota =

getAnggota(

    item.idAnggota

);

        tbody.innerHTML +=

        `
        <tr>

        <td>${item.tanggal}</td>

        <td>

${

anggota ?

anggota.rw :

"-"

}

</td>

        <td>

${

anggota ?

anggota.idAnggota :

"-"

}

</td>

        <td>

${

anggota ?

anggota.nama :

"-"

}

</td>

        <td>${item.jenisBarang}</td>

        <td>${item.berat}</td>

        <td>${formatRupiah(item.harga)}</td>

        <td>${formatRupiah(item.total)}</td>

        </tr>
        `;

    });

}

/* =====================================================
   HEADER PENJUALAN
===================================================== */

function headerLaporanPenjualan(){

    const thead =
    document.querySelector(
        "#tblLaporan thead"
    );

    thead.innerHTML =

    `
    <tr>

        <th>Tanggal</th>

        <th>Barang</th>

        <th>Berat</th>

        <th>Harga</th>

        <th>Total</th>

    </tr>
    `;

}

/* =====================================================
   LAPORAN PENJUALAN
===================================================== */

function tampilLaporanPenjualan(){

    headerLaporanPenjualan();

    const tbody =
    document.querySelector(
        "#tblLaporan tbody"
    );

    tbody.innerHTML="";

    const data =
    filterLaporan(
        DATA.penjualan
    );

    if(data.length===0){

        tbody.innerHTML=

        `
        <tr>

        <td colspan="5">

        Tidak ada data.

        </td>

        </tr>
        `;

        return;

    }

    data.forEach(item=>{

        tbody.innerHTML +=

        `
        <tr>

        <td>${item.tanggal}</td>

        <td>${item.jenisBarang}</td>

        <td>${item.berat}</td>

        <td>${formatRupiah(item.harga)}</td>

        <td>${formatRupiah(item.total)}</td>

        </tr>
        `;

    });

}

/* =====================================================
   HEADER PENARIKAN
===================================================== */

function headerLaporanPenarikan(){

    const thead =
    document.querySelector(
        "#tblLaporan thead"
    );

    thead.innerHTML =

    `
    <tr>

        <th>Tanggal</th>

        <th>RW</th>

        <th>ID</th>

        <th>Nama</th>

        <th>Nominal</th>

    </tr>
    `;

}

/* =====================================================
   LAPORAN PENARIKAN
===================================================== */

function tampilLaporanPenarikan(){

    headerLaporanPenarikan();

    const tbody =
    document.querySelector(
        "#tblLaporan tbody"
    );

    tbody.innerHTML = "";

    const data =
    filterLaporan(
        DATA.penarikan
    );

    if(data.length===0){

        tbody.innerHTML =

        `
        <tr>

            <td colspan="5">

                Tidak ada data.

            </td>

        </tr>
        `;

        return;

    }

    data.forEach(item=>{

        const anggota =
        getAnggota(
            item.idAnggota
        );

        tbody.innerHTML +=

        `
        <tr>

            <td>${item.tanggal}</td>

            <td>${anggota ? anggota.rw : "-"}</td>

            <td>${anggota ? anggota.idAnggota : "-"}</td>

            <td>${anggota ? anggota.nama : "-"}</td>

            <td>${formatRupiah(item.nominal)}</td>

        </tr>
        `;

    });

}

/* =====================================================
   HEADER SALDO ANGGOTA
===================================================== */

function headerLaporanSaldo(){

    const thead =
    document.querySelector(
        "#tblLaporan thead"
    );

    thead.innerHTML =

    `
    <tr>

        <th>RW</th>

        <th>ID</th>

        <th>Nama</th>

        <th>Total Setoran</th>

        <th>Total Penarikan</th>

        <th>Saldo</th>

    </tr>
    `;

}

/* =====================================================
   LAPORAN SALDO ANGGOTA
===================================================== */

function tampilLaporanSaldo(){

    headerLaporanSaldo();

    const tbody =
    document.querySelector(
        "#tblLaporan tbody"
    );

    tbody.innerHTML = "";

    let data =
DATA.anggota;

const rw =
getValue("lapRW");

const anggota =
getValue("lapAnggota");

if(rw){

    data =
    data.filter(item=>

        item.rw === rw

    );

}

if(anggota){

    data =
    data.filter(item=>

        item.firestoreId === anggota

    );

}

    if(data.length===0){

        tbody.innerHTML =

        `
        <tr>

            <td colspan="6">

                Tidak ada data.

            </td>

        </tr>
        `;

        return;

    }

    data.forEach(item=>{

        const totalSetoran =
        hitungTotalSetoranAnggota(
            item.firestoreId
        );

        const totalPenarikan =
        hitungTotalPenarikanAnggota(
            item.firestoreId
        );

        const saldo =
        totalSetoran -
        totalPenarikan;

        tbody.innerHTML +=

        `
        <tr>

            <td>${item.rw}</td>

            <td>${item.idAnggota}</td>

            <td>${item.nama}</td>

            <td>${formatRupiah(totalSetoran)}</td>

            <td>${formatRupiah(totalPenarikan)}</td>

            <td>${formatRupiah(saldo)}</td>

        </tr>
        `;

    });

}

function hitungTotalSetoranAnggota(
    firestoreId
){

    return DATA.setoran
    .filter(item =>
        item.idAnggota ===
        firestoreId
    )
    .reduce(
        (total,item)=>
        total + item.total,
        0
    );

}

function hitungTotalPenarikanAnggota(
    firestoreId
){

    return DATA.penarikan
    .filter(item =>
        item.idAnggota ===
        firestoreId
    )
    .reduce(
        (total,item)=>
        total + item.nominal,
        0
    );

}

/* =====================================================
   HEADER REKAP RW
===================================================== */

function headerLaporanRW(){

    const thead =
    document.querySelector(
        "#tblLaporan thead"
    );

    thead.innerHTML =

    `
    <tr>

        <th>RW</th>

        <th>Jumlah Anggota</th>

        <th>Total Setoran</th>

        <th>Total Penarikan</th>

        <th>Total Saldo</th>

    </tr>
    `;

}

/* =====================================================
   LAPORAN REKAP RW
===================================================== */

function tampilLaporanRW(){

    headerLaporanRW();

    const tbody =
    document.querySelector(
        "#tblLaporan tbody"
    );

    tbody.innerHTML = "";

    const daftarRW = [
    "1",
    "2",
    "3",
    "4",
    "5"
];

    let grandAnggota = 0;
    let grandSetoran = 0;
    let grandPenarikan = 0;
    let grandSaldo = 0;

    daftarRW.forEach(rw=>{

        const anggotaRW =
DATA.anggota.filter(item=>{

    return String(item.rw)
    .replace("RW ","")
    .trim() ===
    String(rw)
    .replace("RW ","")
    .trim();

});

        const jumlahAnggota =
        anggotaRW.length;

        const idAnggota =
        anggotaRW.map(item=>

            item.firestoreId

        );

        const totalSetoran =
        DATA.setoran
        .filter(item=>

            idAnggota.includes(
                item.idAnggota
            )

        )
        .reduce(
            (t,item)=>

            t + item.total,

            0
        );

        const totalPenarikan =
        DATA.penarikan
        .filter(item=>

            idAnggota.includes(
                item.idAnggota
            )

        )
        .reduce(
            (t,item)=>

            t + item.nominal,

            0
        );

        const saldo =
        totalSetoran -
        totalPenarikan;

        grandAnggota += jumlahAnggota;
        grandSetoran += totalSetoran;
        grandPenarikan += totalPenarikan;
        grandSaldo += saldo;

        tbody.innerHTML +=

        `
        <tr>

            <td>RW ${rw}</td>

            <td>${jumlahAnggota}</td>

            <td>${formatRupiah(totalSetoran)}</td>

            <td>${formatRupiah(totalPenarikan)}</td>

            <td>${formatRupiah(saldo)}</td>

        </tr>
        `;

    });

    tbody.innerHTML +=

    `
    <tr>

        <th>Total</th>

        <th>${grandAnggota}</th>

        <th>${formatRupiah(grandSetoran)}</th>

        <th>${formatRupiah(grandPenarikan)}</th>

        <th>${formatRupiah(grandSaldo)}</th>

    </tr>
    `;

}	