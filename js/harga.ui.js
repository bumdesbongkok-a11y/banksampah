/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : harga.ui.js

   Fungsi :
   - Tampilan modul master harga
===================================================== */



/* =====================================================
   TAMPIL DATA HARGA
===================================================== */

function tampilHarga(){


    const tbody =

    document.querySelector(
        "#tblHarga tbody"
    );


    if(!tbody) return;



    tbody.innerHTML = "";



    let data =

    [...DATA.harga];



    const cari =

    getValue(
        "txtCariHarga"
    )
    .toLowerCase();



    if(cari){


        data =

        data.filter(item =>


            item.jenisBarang

            .toLowerCase()

            .includes(cari)


        );


    }





    if(data.length === 0){


        tbody.innerHTML = `

        <tr>

            <td colspan="4">

                Belum ada data harga

            </td>

        </tr>

        `;


        updateDashboardHarga();

        return;

    }





    data.forEach((item,index)=>{


        tbody.innerHTML += `

        <tr>


            <td>

                ${index + 1}

            </td>



            <td>

                ${item.jenisBarang || ""}

            </td>



            <td>

                ${formatRupiah(item.harga)}

            </td>



            <td>


                <button

                class="btn"

                onclick="editHarga('${item.firestoreId}')">

                    ✏️

                </button>




                <button

                class="btn"

                onclick="hapusHarga('${item.firestoreId}')">

                    🗑️

                </button>


            </td>


        </tr>

        `;


    });



    updateDashboardHarga();


}





/* =====================================================
   DASHBOARD HARGA
===================================================== */

function updateDashboardHarga(){


    setText(

        "dashTotalHarga",

        DATA.harga.length

    );


}





/* =====================================================
   ISI FORM EDIT
===================================================== */

function isiFormHarga(item){


    setValue(

        "txtJenisBarang",

        item.jenisBarang

    );



    setValue(

        "txtHarga",

        item.harga

    );



    disable(

        "btnSimpanHarga"

    );


    enable(

        "btnUpdateHarga"

    );


    enable(

        "btnBatalHarga"

    );


}





/* =====================================================
   RESET FORM HARGA
===================================================== */

function resetFormHarga(){


    setValue(

        "txtJenisBarang",

        ""

    );


    setValue(

        "txtHarga",

        ""

    );



    enable(

        "btnSimpanHarga"

    );


    disable(

        "btnUpdateHarga"

    );


    disable(

        "btnBatalHarga"

    );


}