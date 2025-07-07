import nodemailer from 'nodemailer';

// Configuração do transportador de email
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Email do Gmail
      pass: process.env.GMAIL_APP_PASSWORD // Senha de app do Gmail
    }
  });
};

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder OPTIONS para preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    console.log('🚀 Iniciando envio de email...');
    
    // Verificar variáveis de ambiente
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('❌ Variáveis de ambiente não configuradas');
      return res.status(500).json({
        success: false,
        error: 'Variáveis de ambiente não configuradas',
        details: 'GMAIL_USER ou GMAIL_APP_PASSWORD não encontradas'
      });
    }

    console.log('✅ Variáveis de ambiente encontradas');
    console.log('📧 Email configurado:', process.env.GMAIL_USER);

    // Parse dos dados recebidos
    const { reservationData, pdfData } = req.body;

    // Validar dados obrigatórios
    if (!reservationData || !pdfData) {
      console.error('❌ Dados inválidos recebidos');
      return res.status(400).json({ 
        success: false, 
        error: 'Dados da reserva ou PDF não fornecidos' 
      });
    }

    console.log('✅ Dados da reserva recebidos:', reservationData.passengerName);

    // Criar transportador de email
    const transporter = createTransporter();
    
    // Testar conexão
    console.log('🔄 Verificando conexão com Gmail...');
    await transporter.verify();
    console.log('✅ Conexão com Gmail estabelecida');

    // Converter PDF base64 para buffer
    console.log('🔄 Convertendo PDF base64 para buffer...');
    const pdfBuffer = Buffer.from(pdfData, 'base64');
    console.log('✅ PDF convertido. Tamanho:', Math.round(pdfBuffer.length / 1024) + 'KB');

    // Configurar opções do email
    console.log('🔄 Configurando opções do email...');
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'gabriel.gbllima10@gmail.com',
      subject: `● Nova Reserva - ${reservationData.passengerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">EXECUTIVE PREMIUM</h1>
            <p style="margin: 5px 0;">Transporte Executivo de Alto Padrão</p>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-top: 0;">Nova Reserva Recebida</h2>
            
            <div style="background-color: #fff; padding: 15px; margin: 10px 0; border-radius: 5px;">
              <h3 style="color: #000; margin-top: 0;">📋 Dados da Viagem</h3>
              <p><strong>Data:</strong> ${reservationData.date}</p>
              <p><strong>Horário:</strong> ${reservationData.time}</p>
              <p><strong>Origem:</strong> ${reservationData.pickup}</p>
              <p><strong>Destino:</strong> ${reservationData.destination}</p>
              <p><strong>Distância:</strong> ${reservationData.distance}</p>
            </div>
            
            <div style="background-color: #fff; padding: 15px; margin: 10px 0; border-radius: 5px;">
              <h3 style="color: #000; margin-top: 0;">🚙 Veículo Selecionado</h3>
              <p><strong>Categoria:</strong> ${reservationData.vehicleCategory}</p>
              <p><strong>Tipo:</strong> ${reservationData.vehicleType}</p>
              <p><strong>Valor:</strong> ${reservationData.price}</p>
            </div>
            
            <div style="background-color: #fff; padding: 15px; margin: 10px 0; border-radius: 5px;">
              <h3 style="color: #000; margin-top: 0;">👤 Dados do Passageiro</h3>
              <p><strong>Nome:</strong> ${reservationData.passengerName}</p>
              <p><strong>Telefone:</strong> ${reservationData.phone}</p>
              <p><strong>Email:</strong> ${reservationData.email}</p>
              <p><strong>Reserva:</strong> ${reservationData.reserveFor}</p>
            </div>
            
            ${reservationData.flightNumber ? `
            <div style="background-color: #fff; padding: 15px; margin: 10px 0; border-radius: 5px;">
              <h3 style="color: #000; margin-top: 0;">✈️ Detalhes do Voo</h3>
              <p><strong>Número do voo:</strong> ${reservationData.flightNumber}</p>
            </div>
            ` : ''}
            
            <div style="background-color: #fff; padding: 15px; margin: 10px 0; border-radius: 5px;">
              <h3 style="color: #000; margin-top: 0;">📋 Detalhes Adicionais</h3>
              <p><strong>Nome na placa:</strong> ${reservationData.plateName || 'Não informado'}</p>
              <p><strong>Número de malas:</strong> ${reservationData.luggageCount}</p>
              ${reservationData.observations ? `<p><strong>Observações:</strong> ${reservationData.observations}</p>` : ''}
            </div>
            
            <div style="background-color: #e8f5e8; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #4caf50;">
              <p style="margin: 0;"><strong>📎 PDF em anexo</strong> com todos os detalhes da reserva</p>
            </div>
          </div>
          
          <div style="background-color: #f0f0f0; padding: 15px; text-align: center; color: #666;">
            <p style="margin: 0;">Reserva gerada automaticamente pelo sistema</p>
            <p style="margin: 5px 0;">Executive Premium - Transporte Executivo</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Executive_Premium_Reserva_${reservationData.passengerName.replace(/\s+/g, '_')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    console.log('✅ Configurações do email preparadas');

    // Enviar email
    console.log('🔄 Enviando email para:', mailOptions.to);
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado com sucesso! Message ID:', result.messageId);

    return res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso!',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    console.error('❌ Stack trace:', error.stack);
    
    // Verificar se é erro de autenticação
    if (error.code === 'EAUTH') {
      console.error('❌ Erro de autenticação Gmail. Verifique GMAIL_USER e GMAIL_APP_PASSWORD');
    }
    
    return res.status(500).json({
      success: false,
      error: 'Erro ao enviar email',
      details: error.message,
      code: error.code || 'UNKNOWN'
    });
  }
} 