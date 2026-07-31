/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3
   File : penjualan.ui.js
   Fungsi : Tampilan Penjualan
===================================================== */



/* =====================================================
   ISI DROPDOWN BARANG
===================================================== */

function isiDropdownBarangJual(){

    const select =
    el("cmbJenisBarangJual");

    if(!select) return;

    select.innerHTML = `

        <option value="">

            -- Pilih Barang --

        </option>

    `;

    DATA.harga.forEach(item=>{

        select.innerHTML += `

            <option value="${item.firestoreId}">

                ${item.jenisBarang}

            </option>

        `;

    });

}



/* =====================================================
   PILIH BARANG PENJUALAN
===================================================== */

function pilihHargaJual(){

    const idBarang =
    getValue("cmbJenisBarangJual");

    if(!idBarang){

        setValue(
            "txtHargaJual",
            ""
        );

        setValue(
            "txtTotalJual",
            ""
        );

        return;

    }

    setValue(
        "txtHargaJual",
        ""
    );

    setValue(
        "txtTotalJual",
        ""
    );

    focus("txtHargaJual");

}



/* =====================================================
   HITUNG TOTAL
===================================================== */

function hitungTotalJual(){

    const berat =
    getNumber("txtBeratJual");

    const harga =
    getNumber("txtHargaJual");

    const total =
    hitungTotal(
        berat,
        harga
    );

    setValue(
        "txtTotalJual",
        total
    );

}



/* =====================================================
   TAMPIL DATA
===================================================== */

function tampilPenjualan(){

    const tbody =
    document.querySelector(
        "#tblPenjualan tbody"
    );

    if(!tbody) return;

    tbody.innerHTML="";
	
	const tanggal =
getValue("txtFilterTanggalJual");

const dataFilter =

DATA.penjualan.filter(item=>{

    if(
        tanggal &&
        item.tanggal !== tanggal
    ){

        return false;

    }

    return true;

});

    if(dataFilter.length===0){

        tbody.innerHTML=`

            <tr>

                <td colspan="5">

                    Belum ada data

                </td>

            </tr>

        `;

        updateDashboardPenjualan([]);

        return;

    }

    dataFilter.forEach(item=>{

        tbody.innerHTML+=`

            <tr>

                <td>

                    ${item.tanggal}

                </td>

                <td>

                    ${item.jenisBarang}

                </td>

                <td>

                    ${item.berat}

                </td>

                <td>

                    ${formatRupiah(item.total)}

                </td>

                <td>

                    <button
                    class="btn"
                    onclick="editPenjualan('${item.firestoreId}')">

                        ✏️

                    </button>

                    <button
                    class="btn"
                    onclick="hapusPenjualan('${item.firestoreId}')">

                        🗑️

                    </button>

                </td>

            </tr>

        `;

    });

    updateDashboardPenjualan(dataFilter);

}



/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboardPenjualan(data){

    setText(

        "dashTotalPenjualanTransaksi",

        data.length

    );

    const totalPenjualan =
data.reduce(

        (jumlah,item)=>

        jumlah+

        Number(item.total||0),

        0

    );

    setText(

        "dashTotalPenjualan",

        formatRupiah(totalPenjualan)

    );



    const totalSetoran =
    DATA.setoran.reduce(

        (jumlah,item)=>

        jumlah+

        Number(item.total||0),

        0

    );
	
	
	setText(

    "dashTotalSetoranPenjualan",

    formatRupiah(totalSetoran)

);
	
	const totalOperasional =
DATA.operasional.reduce(

    (jumlah,item)=>

    jumlah +

    Number(item.nominal||0),

    0

);

setText(

    "dashTotalOperasional",

    formatRupiah(totalOperasional)

);


   let laba =

totalPenjualan -
totalSetoran -
totalOperasional;

if(laba < 0){

    laba = 0;

}



    setText(

        "dashEstimasiLaba",

        formatRupiah(laba)

    );

}



/* =====================================================
   RESET FORM
===================================================== */

function resetFormPenjualan(){

    setValue(

        "txtTanggalJual",

        new Date()

        .toISOString()

        .slice(0,10)

    );



    setValue(

        "txtHariJual",

        getNamaHari(

            getValue("txtTanggalJual")

        )

    );



    setValue(

        "cmbJenisBarangJual",

        ""

    );



    setValue(

        "txtBeratJual",

        ""

    );



    setValue(

        "txtHargaJual",

        ""

    );



    setValue(

        "txtTotalJual",

        ""

    );



    disable(

        "btnUpdateJual"

    );



    disable(

        "btnBatalJual"

    );



    enable(

        "btnSimpanJual"

    );

}