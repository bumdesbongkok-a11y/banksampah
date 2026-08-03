
/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : operasional.ui.js

   Fungsi :
   - Tampilan modul operasional
===================================================== */

/* =====================================================
   FILTER OPERASIONAL
===================================================== */

function filterOperasional(){

    const tanggalAwal =
    getValue(
        "txtFilterTanggalAwalOperasional"
    );

    const tanggalAkhir =
    getValue(
        "txtFilterTanggalAkhirOperasional"
    );

    return DATA.operasional.filter(item=>{

        /* ============================================
           FILTER TANGGAL
        ============================================ */

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

        /* ============================================
           JIKA FILTER KOSONG
           GUNAKAN PERIODE AKTIF
        ============================================ */

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

        return true;

    });

}

/* =====================================================
   TAMPIL OPERASIONAL
===================================================== */

function tampilOperasional(){


    const tbody =

    document.querySelector(

        "#tblOperasional tbody"

    );



    if(!tbody) return;



    tbody.innerHTML = "";



    const dataOperasional =

filterOperasional();



    if(dataOperasional.length === 0){


        tbody.innerHTML = `

        <tr>

            <td colspan="5">

                Belum ada data operasional

            </td>

        </tr>

        `;


        updateDashboardOperasional([]);

        return;


    }



    dataOperasional.forEach(item=>{


        tbody.innerHTML += `

        <tr>


            <td>

                ${item.tanggal || ""}

            </td>


            <td>

                ${item.kategori || ""}

            </td>


            <td>

                ${item.uraian || ""}

            </td>


            <td>

                ${formatRupiah(item.nominal)}

            </td>


            <td>


                <button

                class="btn"

                onclick="editOperasional('${item.firestoreId}')">

                    ✏️

                </button>



                <button

                class="btn"

                onclick="hapusOperasional('${item.firestoreId}')">

                    🗑️

                </button>


            </td>


        </tr>

        `;


    });



    updateDashboardOperasional(
    dataOperasional
);


}


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboardOperasional(data){


    const total =

data.reduce(

        (jumlah,item)=>{


            return jumlah +

            Number(

                item.nominal || 0

            );


        },

        0

    );



    setText(

        "totalOperasional",

        formatRupiah(total)

    );


}


/* =====================================================
   RESET FILTER
===================================================== */

function resetFilterOperasional(){

    setValue(
        "txtFilterTanggalAwalOperasional",
        ""
    );

    setValue(
        "txtFilterTanggalAkhirOperasional",
        ""
    );

    tampilOperasional();

}


/* =====================================================
   RESET FORM
===================================================== */

function resetFormOperasional(){


    setValue(

        "txtTanggalOperasional",

        new Date()

        .toISOString()

        .slice(0,10)

    );



    setValue(

        "txtHariOperasional",

        getNamaHari(

            getValue(

                "txtTanggalOperasional"

            )

        )

    );



    setValue(

        "cmbKategoriOperasional",

        ""

    );



    setValue(

        "txtUraianOperasional",

        ""

    );



    setValue(

        "txtNominalOperasional",

        ""

    );



    disable(

        "btnUpdateOperasional"

    );



    disable(

        "btnBatalOperasional"

    );



    enable(

        "btnSimpanOperasional"

    );


}

