import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Função para converter uma imagem para WebP
async function convertToWebP(inputPath, outputPath, quality = 80) {
  try {
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    
    console.log(`✅ Convertido: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao converter ${inputPath}:`, error.message);
    return false;
  }
}

// Função para processar um diretório
async function processDirectory(dirPath, extensions = ['.jpg', '.jpeg', '.png']) {
  const files = fs.readdirSync(dirPath);
  const conversions = [];
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Processar subdiretórios recursivamente
      const subConversions = await processDirectory(filePath, extensions);
      conversions.push(...subConversions);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        const nameWithoutExt = path.parse(file).name;
        const outputPath = path.join(dirPath, `${nameWithoutExt}.webp`);
        
        // Verificar se o arquivo WebP já existe
        if (!fs.existsSync(outputPath)) {
          conversions.push({ input: filePath, output: outputPath });
        } else {
          console.log(`⏭️  Já existe: ${path.basename(outputPath)}`);
        }
      }
    }
  }
  
  return conversions;
}

// Função principal
async function main() {
  console.log('🚀 Iniciando conversão de imagens para WebP...');
  
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Verificar se o diretório public existe
  if (!fs.existsSync(publicDir)) {
    console.error('❌ Diretório public não encontrado!');
    return;
  }
  
  try {
    // Encontrar todas as imagens que precisam ser convertidas
    const conversions = await processDirectory(publicDir);
    
    if (conversions.length === 0) {
      console.log('✅ Todas as imagens já estão em formato WebP!');
      return;
    }
    
    console.log(`📋 Encontradas ${conversions.length} imagens para converter...`);
    
    // Converter todas as imagens
    let successCount = 0;
    let errorCount = 0;
    
    for (const { input, output } of conversions) {
      const success = await convertToWebP(input, output);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    }
    
    console.log('\n📊 Relatório de Conversão:');
    console.log(`✅ Sucessos: ${successCount}`);
    console.log(`❌ Erros: ${errorCount}`);
    console.log(`📁 Total processado: ${conversions.length}`);
    
    if (successCount > 0) {
      console.log('\n💡 Próximos passos:');
      console.log('1. Atualize as referências no código para usar .webp');
      console.log('2. Teste se todas as imagens carregam corretamente');
      console.log('3. Considere remover os arquivos originais após confirmar que tudo funciona');
    }
    
  } catch (error) {
    console.error('❌ Erro durante a conversão:', error);
  }
}

// Executar o script
main();

export { convertToWebP, processDirectory };