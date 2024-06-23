
// CONVERTER DATAS
export async function converterFormatoData(formatoData) {
    if (typeof formatoData === 'string') {
        return new Promise((resolve, reject) => {
            const [dia, mes, ano] = formatoData.split('/').map(Number);
            const obj = new Date(ano, mes - 1, dia);
            const timestamp = obj.getTime();
            resolve(timestamp);
        });
    }

    if (typeof formatoData === 'object') {
        const obj = new Date(formatoData);

        const dia = obj.getDate();
        const mes = obj.getMonth() + 1;
        const ano = obj.getFullYear();

        const diaFormatado = dia < 10 ? `0${dia}` : dia;
        const mesFormatado = mes < 10 ? `0${mes}` : mes;

        return `${diaFormatado}/${mesFormatado}/${ano}`;
    }
}