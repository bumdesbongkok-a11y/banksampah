/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3
   File : utilis.js
   Fungsi : Fungsi umum aplikasi
===================================================== */



/* =====================================================
   FORMAT RUPIAH
===================================================== */

function formatRupiah(angka){

    angka = Number(angka) || 0;

    return angka.toLocaleString(

        "id-ID",

        {

            style: "currency",

            currency: "IDR",

            minimumFractionDigits: 0,

            maximumFractionDigits: 0

        }

    );

}



/* =====================================================
   FORMAT ANGKA
===================================================== */

function formatAngka(angka) {

    angka = Number(angka) || 0;

    return angka.toLocaleString(LOCALE);

}



/* =====================================================
   NAMA HARI
===================================================== */

function getNamaHari(tanggal) {

    if (!tanggal) return "";

    const hari = new Date(tanggal).getDay();

    return HARI[hari];

}



/* =====================================================
   HITUNG TOTAL
===================================================== */

function hitungTotal(berat, harga) {

    berat = Number(berat) || 0;

    harga = Number(harga) || 0;

    return berat * harga;

}



/* =====================================================
   KOSONGKAN FORM
===================================================== */

function resetForm(idForm) {

    const form = document.getElementById(idForm);

    if (!form) return;

    form.reset();

}

/* =====================================================
   ISI SEMUA DROPDOWN RW
===================================================== */

function isiSemuaDropdownRW() {

    isiDropdownRW("cmbRW");

    isiDropdownRW("cmbRWAnggota");

    isiDropdownRW("cmbRWSetoran");

    isiDropdownRW("cmbRWTarik");

    isiDropdownRW("lapRW");

}

/* =====================================================
   ISI DROPDOWN RW
===================================================== */

function isiDropdownRW(id){

    const select =
    el(id);

    if(!select) return;


    select.innerHTML = `

    <option value="">

        -- Pilih RW --

    </option>

    `;


    for(let i = 1; i <= 5; i++){

        select.innerHTML += `

        <option value="${i}">

            RW ${i}

        </option>

        `;

    }

}

/* =====================================================
   AMBIL ELEMENT HTML
===================================================== */

function el(id) {

    return document.getElementById(id);

}

/* =====================================================
   SET VALUE
===================================================== */

function setValue(id, value) {

    const element = el(id);

    if (!element) return;

    element.value = value;

}

/* =====================================================
   GET VALUE
===================================================== */

function getValue(id) {

    const element = el(id);

    if (!element) return "";

    return element.value;

}

/* =====================================================
   SET TEXT
===================================================== */

function setText(id, text) {

    const element = el(id);

    if (!element) return;

    element.textContent = text;

}

/* =====================================================
   ENABLE BUTTON
===================================================== */

function enable(id) {

    const element = el(id);

    if (!element) return;

    element.disabled = false;

}

/* =====================================================
   DISABLE BUTTON
===================================================== */

function disable(id, status = true){

    const element = el(id);

    if(!element) return;

    element.disabled = status;

}

/* =====================================================
   SHOW
===================================================== */

function show(id){

    const element = el(id);

    if(!element) return;

    if(element.classList.contains("halaman")){

        element.classList.add("active");

    }else{

        element.style.display="";

    }

}

/* =====================================================
   HIDE
===================================================== */

function hide(id){

    const element = el(id);

    if(!element) return;

    if(element.classList.contains("halaman")){

        element.classList.remove("active");

    }else{

        element.style.display="none";

    }

}

/* =====================================================
   GET NUMBER
===================================================== */

function getNumber(id) {

    return Number(
        getValue(id)
    ) || 0;

}
/* =====================================================
   FOCUS
===================================================== */

function focus(id){

    const element =
    el(id);

    if(!element) return;

    element.focus();

}

/* =====================================================
   CARI DATA ANGGOTA
===================================================== */

function getAnggota(firestoreId){

    return DATA.anggota.find(

        item => item.firestoreId === firestoreId

    );

}

