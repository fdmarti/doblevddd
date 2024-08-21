import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Pedido } from '@pedidos/interfaces';

const imageLogoBase64 =
  'data:image/png;base64,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';

export const createNewFactura = (pedidoData: Pedido) => {
  const doc = new jsPDF('landscape', 'pt', 'A4');

  doc.addImage(imageLogoBase64, 30, 20, 120, 120);

  doc.text('Doble V 3D', 150, 75);
  doc.setFontSize(8);
  doc.text('Morón, GBA Zona Oeste - B1017', 150, 86);
  doc.text('Telefono : 1234567890', 150, 96);
  doc.text('Website : https://catalogo-doblev3d.vercel.app', 150, 106);

  //   doc.lines(
  //     [
  //       [200, 0],
  //       [0, 50],
  //       [-200, 0],
  //       [0, -50],
  //     ],
  //     600,
  //     50,
  //   );

  autoTable(doc, {
    startY: 50,
    styles: {
      cellWidth: 100,
    },
    margin: { left: 600 },
    body: [
      [{ content: 'Fecha', styles: { halign: 'right' } }, '24/10/2018'],
      [{ content: 'Codigo de factura', styles: { halign: 'right' } }, `#${pedidoData.id}`],
    ],
  });

  autoTable(doc, {
    startY: 170,
    theme: 'grid',
    body: [
      [{ content: 'Cliente:' }, pedidoData.cliente, { content: 'Contacto:' }, pedidoData.contacto],
    ],
  });

  doc.setFontSize(13);
  doc.text('FACTURA ELECTRÓNICA', 600, 40);

  const columns = ['Cantidad', 'Detalle', 'Precio Unidad', 'Precio Total'];

  autoTable(doc, {
    startY: 200,
    head: [columns],
    headStyles: {
      fillColor: '#D70040',
    },
    footStyles: {
      fillColor: '#D70040',
    },
    body: pedidoData.productos.map((prod) => {
      return [
        prod.cantidad,
        `${prod.descripcion} ${prod.observaciones ? ' / ' + prod.observaciones : ''}`,
        `$ ${prod.preciounidad}`,
        `$ ${prod.total}`,
      ];
    }),
    foot: [['Total', '', '', `$ ${pedidoData.preciototal}`]],
  });

  doc.save(`Factura-${pedidoData.id}`);
};
