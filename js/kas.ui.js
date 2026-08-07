/* =====================================================
   KAS UI
===================================================== */

/* =====================================================
   TAMPIL DATA
===================================================== */

function tampilKas(data = DATA.kas){

    const tbody =

    el("tblKas")
    .querySelector("tbody");

    tbody.innerHTML = "";

    if(data.length == 0){

        tbody.innerHTML =

        "<tr><td colspan='8' class='center'>Tidak ada data.</td></tr>";

        el("totalKas").textContent =

        formatRupiah(0);

        return;

    }

    let saldo = 0;

    data.forEach(item=>{

        const masuk =

        item.jenis == "Masuk"

        ? Number(item.nominal)

        : 0;

        const keluar =

        item.jenis == "Keluar"

        ? Number(item.nominal)

        : 0;

        saldo +=

        masuk - keluar;

        tbody.innerHTML += `

        <tr>

            <td>${item.tanggal}</td>

            <td>${item.jenis}</td>

            <td>${item.kategori}</td>

            <td>${item.uraian}</td>

            <td>${formatRupiah(masuk)}</td>

            <td>${formatRupiah(keluar)}</td>

            <td>${formatRupiah(saldo)}</td>

            <td>

    ${
        item.sumber == "TUTUP_BUKU"

        ?

        `<span
            class="statusLocked">
            🔒 Otomatis
        </span>`

        :

        `
        <button
        onclick="editKas('${item.id}')">

            ✏

        </button>

        <button
        onclick="hapusKas('${item.id}')">

            🗑

        </button>
        `
    }

</td>

        </tr>

        `;

    });

    el("totalKas").textContent =

    formatRupiah(saldo);

}