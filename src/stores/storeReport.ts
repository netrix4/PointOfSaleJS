// storeReport.ts
import { ref } from "vue";
import { supabase } from "@/supabase";
import { jsPDF } from "jspdf";

export const useReportStore = () => {
  const from = ref("");
  const to = ref("");
  const loading = ref(false);
  const sales = ref<any[]>([]);

  const loadReport = async () => {
    if (!from.value || !to.value) {
        alert("Selecciona un rango válido");
        return;
    }

    const { data, error } = await supabase
        .from("checkouts")
        .select("*")
        .gte("created_at", `${from.value} 00:00:00`)
        .lte("created_at", `${to.value} 23:59:59`)
        .order("created_at", { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    sales.value = data || [];
};

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("es-MX", {
        dateStyle: "short",
        timeStyle: "short",
        hour12: false,
    });

const generatePDF = () => {
    if (sales.value.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    loading.value = true;

    const pdf = new jsPDF();
    let y = 20;

    pdf.setFontSize(18);
    pdf.text("Reporte de Ventas", 14, y);
    y += 10;

    pdf.setFontSize(12);
    pdf.text(`Desde: ${from.value}   Hasta: ${to.value}`, 14, y);
    y += 10;

    pdf.setFontSize(11);
    pdf.text("ID", 14, y);
    pdf.text("Fecha", 40, y);
    pdf.text("Total", 110, y);
    pdf.text("Productos", 150, y);
    y += 8;

    sales.value.forEach((sale) => {
        pdf.text(String(sale.id), 14, y);
        pdf.text(formatDate(sale.created_at), 40, y);
        pdf.text(`$ ${sale.total}`, 110, y);
        pdf.text(String(sale.products_ids.length), 150, y);

        y += 8;

        if (y > 280) {
        pdf.addPage();
        y = 20;
        }
    });

    pdf.save("reporte.pdf");

    loading.value = false;
};

return {
    from,
    to,
    loading,
    sales,
    loadReport,
    generatePDF,
    formatDate,
    }
}