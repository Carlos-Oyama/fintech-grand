export type FieldType = 'text' | 'email' | 'number' | 'date'

export type ResourceField = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  step?: string
}

export type ResourceConfig = {
  path: string
  title: string
  description: string
  idField: string
  fields: ResourceField[]
  columns: Array<{ name: string; label: string }>
}

export const resources: ResourceConfig[] = [
  {
    path: 'usuarios',
    title: 'Usuários',
    description: 'Cadastros e dados dos usuários.',
    idField: 'idUsuario',
    fields: [
      { name: 'nome', label: 'Nome', type: 'text', required: true },
      { name: 'email', label: 'E-mail', type: 'email', required: true },
      { name: 'cpfCnpj', label: 'CPF/CNPJ', type: 'text', required: true },
      { name: 'telefone', label: 'Telefone', type: 'text' },
    ],
    columns: [
      { name: 'idUsuario', label: 'ID' },
      { name: 'nome', label: 'Nome' },
      { name: 'email', label: 'E-mail' },
      { name: 'cpfCnpj', label: 'CPF/CNPJ' },
      { name: 'telefone', label: 'Telefone' },
    ],
  },
  {
    path: 'contas',
    title: 'Contas',
    description: 'Contas e saldos associados aos usuários.',
    idField: 'idConta',
    fields: [
      { name: 'usuario.idUsuario', label: 'ID do usuário', type: 'number', required: true },
      { name: 'tipoConta', label: 'Tipo de conta', type: 'text', required: true },
      { name: 'saldo', label: 'Saldo', type: 'number', step: '0.01' },
      { name: 'moeda', label: 'Moeda', type: 'text' },
      { name: 'status', label: 'Status', type: 'text' },
    ],
    columns: [
      { name: 'idConta', label: 'ID' },
      { name: 'usuario.nome', label: 'Usuário' },
      { name: 'tipoConta', label: 'Tipo' },
      { name: 'saldo', label: 'Saldo' },
      { name: 'moeda', label: 'Moeda' },
      { name: 'status', label: 'Status' },
    ],
  },
  {
    path: 'despesas',
    title: 'Despesas',
    description: 'Despesas registradas pelos usuários.',
    idField: 'idDespesa',
    fields: [
      { name: 'usuario.idUsuario', label: 'ID do usuário', type: 'number', required: true },
      { name: 'valor', label: 'Valor', type: 'number', required: true, step: '0.01' },
      { name: 'dataDespesa', label: 'Data', type: 'date', required: true },
      { name: 'descricao', label: 'Descrição', type: 'text' },
      { name: 'categoria', label: 'Categoria', type: 'text' },
    ],
    columns: [
      { name: 'idDespesa', label: 'ID' },
      { name: 'usuario.nome', label: 'Usuário' },
      { name: 'valor', label: 'Valor' },
      { name: 'dataDespesa', label: 'Data' },
      { name: 'categoria', label: 'Categoria' },
    ],
  },
  {
    path: 'receitas',
    title: 'Receitas',
    description: 'Receitas e suas origens.',
    idField: 'idReceita',
    fields: [
      { name: 'usuario.idUsuario', label: 'ID do usuário', type: 'number', required: true },
      { name: 'valor', label: 'Valor', type: 'number', required: true, step: '0.01' },
      { name: 'moeda', label: 'Moeda', type: 'text' },
      { name: 'dataReceita', label: 'Data', type: 'date', required: true },
      { name: 'descricao', label: 'Descrição', type: 'text' },
      { name: 'origem', label: 'Origem', type: 'text' },
    ],
    columns: [
      { name: 'idReceita', label: 'ID' },
      { name: 'usuario.nome', label: 'Usuário' },
      { name: 'valor', label: 'Valor' },
      { name: 'dataReceita', label: 'Data' },
      { name: 'origem', label: 'Origem' },
    ],
  },
  {
    path: 'investimentos',
    title: 'Investimentos',
    description: 'Investimentos registrados pelos usuários.',
    idField: 'idInvestimento',
    fields: [
      { name: 'usuario.idUsuario', label: 'ID do usuário', type: 'number', required: true },
      { name: 'valor', label: 'Valor', type: 'number', required: true, step: '0.01' },
      { name: 'dataInvestimento', label: 'Data', type: 'date', required: true },
      { name: 'descricao', label: 'Descrição', type: 'text' },
      { name: 'tipoInvestimento', label: 'Tipo de investimento', type: 'text' },
    ],
    columns: [
      { name: 'idInvestimento', label: 'ID' },
      { name: 'usuario.nome', label: 'Usuário' },
      { name: 'valor', label: 'Valor' },
      { name: 'dataInvestimento', label: 'Data' },
      { name: 'tipoInvestimento', label: 'Tipo' },
    ],
  },
]
