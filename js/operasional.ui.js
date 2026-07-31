
/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : operasional.ui.js

   Fungsi :
   - Tampilan modul operasional
===================================================== */



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



    if(DATA.operasional.length===0){


        tbody.innerHTML = `

        <tr>

            <td colspan="5">

                Belum ada data operasional

            </td>

        </tr>

        `;


        updateDashboardOperasional();

        return;


    }



    DATA.operasional.forEach(item=>{


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



    updateDashboardOperasional();


}





/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboardOperasional(){


    const total =

    DATA.operasional.reduce(

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

