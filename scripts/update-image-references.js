import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mapeamento de extensões para WebP
const imageExtensions = ['.jpg', '.jpeg', '.png'];

// Função para atualizar referências em um arquivo
function updateImageReferences(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Padrões para encontrar referências de imagens
    const patterns = [
      // Padrão para src="/path/image.jpg"
      /src="([^"]*\.(jpg|jpeg|png))"/gi,
      // Padrão para backgroundImage: "url('/path/image.jpg')"
      /backgroundImage:\s*["']url\(["']([^"']*\.(jpg|jpeg|png))["']\)["']/gi,
      // Padrão para image: '/path/image.jpg'
      /image:\s*["']([^"']*\.(jpg|jpeg|png))["']/gi,
      // Padrão para logo: "/path/image.png"
      /logo:\s*["']([^"']*\.(jpg|jpeg|png))["']/gi
    ];
    
    patterns.forEach(pattern => {
      content = content.replace(pattern, (match, imagePath, extension) => {
        // Converter para WebP
        const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const updatedMatch = match.replace(imagePath, webpPath);
        
        if (match !== updatedMatch) {
          hasChanges = true;
          console.log(`  📝 ${path.basename(filePath)}: ${path.basename(imagePath)} -> ${path.basename(webpPath)}`);
        }
        
        return updatedMatch;
      });
    });
    
    // Salvar arquivo se houve mudanças
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

// Função para processar um diretório recursivamente
function processDirectory(dirPath, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const files = fs.readdirSync(dirPath);
  let updatedFiles = 0;
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Pular node_modules e outras pastas desnecessárias
      if (!['node_modules', '.git', 'dist', 'build'].includes(file)) {
        updatedFiles += processDirectory(filePath, extensions);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        const wasUpdated = updateImageReferences(filePath);
        if (wasUpdated) {
          updatedFiles++;
        }
      }
    }
  }
  
  return updatedFiles;
}

// Função principal
async function main() {
  console.log('🔄 Atualizando referências de imagens para WebP...');
  
  const projectRoot = path.join(__dirname, '..');
  const srcDir = path.join(projectRoot, 'src');
  
  // Verificar se o diretório src existe
  if (!fs.existsSync(srcDir)) {
    console.error('❌ Diretório src não encontrado!');
    return;
  }
  
  try {
    console.log('📁 Processando arquivos TypeScript/JavaScript...');
    const updatedFiles = processDirectory(srcDir);
    
    console.log('\n📊 Relatório de Atualização:');
    console.log(`✅ Arquivos atualizados: ${updatedFiles}`);
    
    if (updatedFiles > 0) {
      console.log('\n💡 Próximos passos:');
      console.log('1. Teste se todas as imagens carregam corretamente');
      console.log('2. Verifique se não há referências quebradas');
      console.log('3. Considere remover os arquivos originais após confirmar que tudo funciona');
    } else {
      console.log('\n✅ Todas as referências já estão atualizadas ou não foram encontradas referências para atualizar.');
    }
    
  } catch (error) {
    console.error('❌ Erro durante a atualização:', error);
  }
}

// Executar o script
main();

export { updateImageReferences, processDirectory };