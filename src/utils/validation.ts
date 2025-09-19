// Utilitários de validação e sanitização de dados
// Implementa validações rigorosas para dados sensíveis

/**
 * Valida e sanitiza CPF
 * @param cpf CPF a ser validado
 * @returns CPF limpo e válido ou null se inválido
 */
export const validateAndSanitizeCPF = (cpf: string): string | null => {
  if (!cpf) return null;
  
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return null;
  
  // Verifica se não são todos os dígitos iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return null;
  
  // Validação do algoritmo do CPF
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return null;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return null;
  
  return cleanCPF;
};

/**
 * Valida e sanitiza email
 * @param email Email a ser validado
 * @returns Email limpo e válido ou null se inválido
 */
export const validateAndSanitizeEmail = (email: string): string | null => {
  if (!email) return null;
  
  // Remove espaços e converte para minúsculas
  const cleanEmail = email.trim().toLowerCase();
  
  // Regex mais rigorosa para email
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(cleanEmail)) return null;
  
  // Verifica comprimento máximo
  if (cleanEmail.length > 254) return null;
  
  return cleanEmail;
};

/**
 * Valida e sanitiza telefone brasileiro
 * @param phone Telefone a ser validado
 * @returns Telefone limpo e válido ou null se inválido
 */
export const validateAndSanitizePhone = (phone: string): string | null => {
  if (!phone) return null;
  
  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Verifica se tem 10 ou 11 dígitos (com DDD)
  if (cleanPhone.length < 10 || cleanPhone.length > 11) return null;
  
  // Verifica se o DDD é válido (11-99)
  const ddd = parseInt(cleanPhone.substring(0, 2));
  if (ddd < 11 || ddd > 99) return null;
  
  // Para celular (11 dígitos), o primeiro dígito após o DDD deve ser 9
  if (cleanPhone.length === 11 && cleanPhone.charAt(2) !== '9') return null;
  
  return cleanPhone;
};

/**
 * Valida e sanitiza nome
 * @param name Nome a ser validado
 * @returns Nome limpo e válido ou null se inválido
 */
export const validateAndSanitizeName = (name: string): string | null => {
  if (!name) return null;
  
  // Remove espaços extras e caracteres especiais perigosos
  const cleanName = name.trim().replace(/[<>\"'&]/g, '');
  
  // Verifica se tem pelo menos 2 caracteres e máximo 100
  if (cleanName.length < 2 || cleanName.length > 100) return null;
  
  // Verifica se contém pelo menos uma letra
  if (!/[a-zA-ZÀ-ÿ]/.test(cleanName)) return null;
  
  return cleanName;
};

/**
 * Valida valor monetário em centavos
 * @param amountCents Valor em centavos
 * @returns Valor válido ou null se inválido
 */
export const validateAmountCents = (amountCents: number): number | null => {
  if (!amountCents || typeof amountCents !== 'number') return null;
  
  // Verifica se é um número positivo
  if (amountCents <= 0) return null;
  
  // Verifica se não é muito grande (máximo R$ 100.000,00)
  if (amountCents > 10000000) return null;
  
  // Verifica se é um número inteiro
  if (!Number.isInteger(amountCents)) return null;
  
  return amountCents;
};

/**
 * Valida número de parcelas
 * @param installments Número de parcelas
 * @returns Número de parcelas válido ou null se inválido
 */
export const validateInstallments = (installments: number): number | null => {
  if (!installments || typeof installments !== 'number') return null;
  
  // Verifica se é um número inteiro positivo
  if (!Number.isInteger(installments) || installments <= 0) return null;
  
  // Verifica se está dentro do limite (máximo 12 parcelas)
  if (installments > 12) return null;
  
  return installments;
};

/**
 * Sanitiza string para prevenir XSS
 * @param input String a ser sanitizada
 * @returns String sanitizada
 */
export const sanitizeString = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/[<>\"'&]/g, '') // Remove caracteres perigosos
    .trim() // Remove espaços extras
    .substring(0, 1000); // Limita tamanho
};