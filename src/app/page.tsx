"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { 
  Plus, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  Lightbulb, 
  Settings, 
  Moon, 
  Sun,
  PiggyBank,
  Car,
  Plane,
  Home,
  ShoppingCart,
  Coffee,
  Gamepad2,
  Heart,
  Book,
  Zap,
  Star,
  Trophy,
  Gift,
  AlertTriangle,
  CheckCircle,
  Brain,
  Sparkles,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  UserPlus
} from 'lucide-react'
import { toast } from 'sonner'

// Tipos de dados
interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
}

interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  icon: string
}

interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
  icon: string
}

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

// Categorias predefinidas
const categories = {
  income: ['Salário', 'Freelance', 'Investimentos', 'Outros'],
  expense: ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Casa', 'Compras', 'Outros']
}

// Ícones para categorias
const categoryIcons: { [key: string]: any } = {
  'Alimentação': Coffee,
  'Transporte': Car,
  'Lazer': Gamepad2,
  'Saúde': Heart,
  'Educação': Book,
  'Casa': Home,
  'Compras': ShoppingCart,
  'Salário': Wallet,
  'Freelance': Zap,
  'Investimentos': TrendingUp,
  'Outros': Star
}

export default function ContaCerta() {
  // Estados de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  // Estados do app principal
  const [darkMode, setDarkMode] = useState(false)
  const [simpleMode, setSimpleMode] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', name: 'Primeiro Passo', description: 'Registre sua primeira transação', unlocked: false, icon: 'CheckCircle' },
    { id: '2', name: 'Poupador', description: 'Economize R$ 500 em um mês', unlocked: false, icon: 'PiggyBank' },
    { id: '3', name: 'Meta Alcançada', description: 'Complete sua primeira meta financeira', unlocked: false, icon: 'Trophy' },
    { id: '4', name: 'Disciplinado', description: 'Use o app por 7 dias consecutivos', unlocked: false, icon: 'Award' }
  ])
  
  const [userLevel, setUserLevel] = useState(1)
  const [userXP, setUserXP] = useState(0)
  const [dailyStreak, setDailyStreak] = useState(0)
  
  // Estados para formulários
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: '',
    description: ''
  })
  
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    icon: 'Target'
  })

  // Validação de email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Funções de autenticação
  const handleAuth = async () => {
    setIsLoading(true)
    
    try {
      if (authMode === 'register') {
        // Validações para registro
        if (!authForm.name.trim()) {
          toast.error('Nome é obrigatório')
          return
        }
        
        if (!authForm.email.trim()) {
          toast.error('Email é obrigatório')
          return
        }
        
        if (!isValidEmail(authForm.email)) {
          toast.error('Email inválido')
          return
        }
        
        if (!authForm.password) {
          toast.error('Senha é obrigatória')
          return
        }
        
        if (authForm.password.length < 6) {
          toast.error('A senha deve ter pelo menos 6 caracteres')
          return
        }
        
        if (authForm.password !== authForm.confirmPassword) {
          toast.error('As senhas não coincidem')
          return
        }

        // Simular delay de criação de conta
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Simular criação de conta
        const newUser: User = {
          id: Date.now().toString(),
          name: authForm.name.trim(),
          email: authForm.email.trim().toLowerCase(),
          createdAt: new Date().toISOString()
        }
        
        setCurrentUser(newUser)
        setIsAuthenticated(true)
        toast.success(`Bem-vindo ao ContaCerta, ${newUser.name}!`)
        
      } else {
        // Validações para login
        if (!authForm.email.trim()) {
          toast.error('Email é obrigatório')
          return
        }
        
        if (!isValidEmail(authForm.email)) {
          toast.error('Email inválido')
          return
        }

        if (!authForm.password) {
          toast.error('Senha é obrigatória')
          return
        }

        // Simular delay de login
        await new Promise(resolve => setTimeout(resolve, 800))

        // Simular login (em produção, validaria com backend)
        const user: User = {
          id: '1',
          name: authForm.email.split('@')[0],
          email: authForm.email.trim().toLowerCase(),
          createdAt: new Date().toISOString()
        }
        
        setCurrentUser(user)
        setIsAuthenticated(true)
        toast.success(`Bem-vindo de volta, ${user.name}!`)
      }
      
      // Limpar formulário
      setAuthForm({ name: '', email: '', password: '', confirmPassword: '' })
      
    } catch (error) {
      toast.error('Erro ao processar solicitação. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    setTransactions([])
    setGoals([])
    setUserXP(0)
    setUserLevel(1)
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '' })
    toast.success('Logout realizado com sucesso!')
  }

  // Função para alternar modo de autenticação
  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login')
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '' })
    setShowPassword(false)
  }

  // Calcular saldo total
  const totalBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount
  }, 0)

  // Calcular gastos por categoria
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
      return acc
    }, {} as { [key: string]: number })

  // Dados para gráficos
  const pieData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: getColorForCategory(category)
  }))

  // Função para obter cor da categoria
  function getColorForCategory(category: string) {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316']
    const index = Object.keys(expensesByCategory).indexOf(category)
    return colors[index % colors.length]
  }

  // Adicionar transação
  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.category) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    const amount = parseFloat(newTransaction.amount)
    if (isNaN(amount) || amount <= 0) {
      toast.error('Valor deve ser um número positivo')
      return
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: newTransaction.type,
      amount: amount,
      category: newTransaction.category,
      description: newTransaction.description.trim(),
      date: new Date().toISOString().split('T')[0]
    }

    setTransactions(prev => [...prev, transaction])
    setNewTransaction({ type: 'expense', amount: '', category: '', description: '' })
    
    // Adicionar XP
    setUserXP(prev => prev + 10)
    
    // Verificar conquistas
    checkAchievements([...transactions, transaction])
    
    toast.success('Transação adicionada com sucesso!')
  }

  // Adicionar meta
  const addGoal = () => {
    if (!newGoal.name.trim() || !newGoal.targetAmount) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    const targetAmount = parseFloat(newGoal.targetAmount)
    if (isNaN(targetAmount) || targetAmount <= 0) {
      toast.error('Valor da meta deve ser um número positivo')
      return
    }

    const goal: Goal = {
      id: Date.now().toString(),
      name: newGoal.name.trim(),
      targetAmount: targetAmount,
      currentAmount: 0,
      deadline: newGoal.deadline,
      icon: newGoal.icon
    }

    setGoals(prev => [...prev, goal])
    setNewGoal({ name: '', targetAmount: '', deadline: '', icon: 'Target' })
    toast.success('Meta criada com sucesso!')
  }

  // Verificar conquistas
  const checkAchievements = (currentTransactions: Transaction[]) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === '1' && currentTransactions.length >= 1 && !achievement.unlocked) {
        toast.success('🏆 Conquista desbloqueada: Primeiro Passo!')
        return { ...achievement, unlocked: true }
      }
      return achievement
    }))
  }

  // Calcular nível do usuário
  useEffect(() => {
    const newLevel = Math.floor(userXP / 100) + 1
    if (newLevel > userLevel) {
      setUserLevel(newLevel)
      toast.success(`🎉 Parabéns! Você subiu para o nível ${newLevel}!`)
    }
  }, [userXP, userLevel])

  // Dicas da IA
  const getAITip = () => {
    const tips = [
      "💡 Você gastou mais com alimentação este mês. Que tal preparar mais refeições em casa?",
      "🎯 Está indo bem! Continue assim para alcançar suas metas financeiras.",
      "📊 Seus gastos com transporte aumentaram. Considere usar transporte público.",
      "💰 Parabéns! Você conseguiu economizar mais este mês comparado ao anterior.",
      "🏆 Você está no caminho certo para sua meta de viagem!"
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  // Mensagens motivacionais
  const motivationalMessages = [
    "🌟 Cada centavo economizado é um passo em direção aos seus sonhos!",
    "💪 Você tem o controle das suas finanças. Continue assim!",
    "🎯 Pequenos passos levam a grandes conquistas financeiras!",
    "✨ Sua disciplina financeira está construindo um futuro brilhante!"
  ]

  const currentMessage = motivationalMessages[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % motivationalMessages.length]

  // Tela de autenticação
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-900' : 'bg-gradient-to-br from-blue-50 to-green-50'}`}>
        <div className="container mx-auto p-4 max-w-md">
          {/* Header */}
          <div className="text-center mb-8 pt-12">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full">
                <Wallet className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
              ContaCerta
            </h1>
            <p className="text-muted-foreground">Planeia, poupa e vive tranquilo</p>
          </div>

          {/* Formulário de autenticação */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">
                {authMode === 'login' ? 'Entrar na sua conta' : 'Criar nova conta'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {authMode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      className="pl-10"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    className="pl-10 pr-10"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {authMode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirme sua senha"
                      className="pl-10"
                      value={authForm.confirmPassword}
                      onChange={(e) => setAuthForm({...authForm, confirmPassword: e.target.value})}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <Button 
                onClick={handleAuth}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-3 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {authMode === 'login' ? 'Entrando...' : 'Criando conta...'}
                  </div>
                ) : (
                  <>
                    {authMode === 'login' ? (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Entrar
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Criar conta
                      </>
                    )}
                  </>
                )}
              </Button>

              <div className="text-center pt-4">
                <Button
                  variant="link"
                  onClick={toggleAuthMode}
                  disabled={isLoading}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  {authMode === 'login' 
                    ? 'Não tem uma conta? Criar conta' 
                    : 'Já tem uma conta? Fazer login'
                  }
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features preview */}
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-semibold text-center text-muted-foreground">
              O que você pode fazer no ContaCerta
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Wallet className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Controle financeiro completo</h3>
                  <p className="text-sm text-muted-foreground">Registre receitas e gastos com categorias</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg">
                <div className="p-2 bg-green-100 rounded-full">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Metas financeiras</h3>
                  <p className="text-sm text-muted-foreground">Crie e acompanhe seus objetivos</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Assistente IA</h3>
                  <p className="text-sm text-muted-foreground">Dicas inteligentes para suas finanças</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium">Sistema de conquistas</h3>
                  <p className="text-sm text-muted-foreground">Gamificação para manter você motivado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle tema na tela de login */}
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full bg-white/80 backdrop-blur-sm"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // App principal (quando autenticado)
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-900' : 'bg-gradient-to-br from-blue-50 to-green-50'}`}>
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              ContaCerta
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Olá, {currentUser?.name}! Planeia, poupa e vive tranquilo
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Nível do usuário */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-full px-4 py-2 shadow-sm">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Nível {userLevel}</span>
              <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userXP % 100)}%` }}
                />
              </div>
            </div>
            
            {/* Toggle modo */}
            <div className="flex items-center gap-2">
              <Label htmlFor="mode-toggle" className="text-sm">Simples</Label>
              <Switch
                id="mode-toggle"
                checked={!simpleMode}
                onCheckedChange={(checked) => setSimpleMode(!checked)}
              />
              <Label htmlFor="mode-toggle" className="text-sm">Avançado</Label>
            </div>
            
            {/* Toggle tema */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Botão de logout */}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Sair
            </Button>
          </div>
        </header>

        {/* Mensagem motivacional */}
        <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            {currentMessage}
          </AlertDescription>
        </Alert>

        {/* Cards principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Saldo total */}
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Saldo Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Wallet className="w-6 h-6" />
                <span className="text-2xl font-bold">
                  R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Receitas do mês */}
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Receitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                <span className="text-2xl font-bold">
                  R$ {transactions
                    .filter(t => t.type === 'income')
                    .reduce((acc, t) => acc + t.amount, 0)
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Gastos do mês */}
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-6 h-6" />
                <span className="text-2xl font-bold">
                  R$ {transactions
                    .filter(t => t.type === 'expense')
                    .reduce((acc, t) => acc + t.amount, 0)
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo principal */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white dark:bg-slate-800 shadow-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Transações
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Metas
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Conquistas
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Insights IA
            </TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de gastos por categoria */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    Gastos por Categoria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Nenhum gasto registrado ainda</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Metas em progresso */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Metas em Progresso
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {goals.length > 0 ? (
                    goals.slice(0, 3).map((goal) => (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{goal.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {((goal.currentAmount / goal.targetAmount) * 100).toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          <span>R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Nenhuma meta criada ainda</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Transações recentes */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {[...transactions].slice(-5).reverse().map((transaction) => {
                      const IconComponent = categoryIcons[transaction.category] || Star
                      return (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description || transaction.category}</p>
                              <p className="text-sm text-muted-foreground">{transaction.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                              {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Wallet className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma transação registrada ainda</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transações */}
          <TabsContent value="transactions" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Nova Transação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select value={newTransaction.type} onValueChange={(value: 'income' | 'expense') => setNewTransaction({...newTransaction, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Receita</SelectItem>
                        <SelectItem value="expense">Gasto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Valor</Label>
                    <Input
                      type="number"
                      placeholder="0,00"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories[newTransaction.type].map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Descrição (opcional)</Label>
                    <Input
                      placeholder="Ex: Almoço no restaurante"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button onClick={addTransaction} className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Transação
                </Button>
              </CardContent>
            </Card>

            {/* Lista de transações */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Histórico de Transações</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {[...transactions].reverse().map((transaction) => {
                      const IconComponent = categoryIcons[transaction.category] || Star
                      return (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description || transaction.category}</p>
                              <p className="text-sm text-muted-foreground">{transaction.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                              {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Wallet className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma transação registrada ainda</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Metas */}
          <TabsContent value="goals" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Nova Meta Financeira</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome da Meta</Label>
                    <Input
                      placeholder="Ex: Viagem para Europa"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Valor Alvo</Label>
                    <Input
                      type="number"
                      placeholder="0,00"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Prazo (opcional)</Label>
                    <Input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Ícone</Label>
                    <Select value={newGoal.icon} onValueChange={(value) => setNewGoal({...newGoal, icon: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Plane">✈️ Viagem</SelectItem>
                        <SelectItem value="Car">🚗 Carro</SelectItem>
                        <SelectItem value="Home">🏠 Casa</SelectItem>
                        <SelectItem value="PiggyBank">🐷 Poupança</SelectItem>
                        <SelectItem value="Target">🎯 Meta Geral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button onClick={addGoal} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  <Target className="w-4 h-4 mr-2" />
                  Criar Meta
                </Button>
              </CardContent>
            </Card>

            {/* Lista de metas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => (
                <Card key={goal.id} className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {goal.icon === 'Plane' && <Plane className="w-5 h-5" />}
                      {goal.icon === 'Car' && <Car className="w-5 h-5" />}
                      {goal.icon === 'Home' && <Home className="w-5 h-5" />}
                      {goal.icon === 'PiggyBank' && <PiggyBank className="w-5 h-5" />}
                      {goal.icon === 'Target' && <Target className="w-5 h-5" />}
                      {goal.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Progresso</span>
                        <span className="text-sm font-medium">
                          {((goal.currentAmount / goal.targetAmount) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-3" />
                      <div className="flex justify-between text-sm">
                        <span>R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        <span>R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                    
                    {goal.deadline && (
                      <div className="text-sm text-muted-foreground">
                        Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        const amount = prompt('Quanto você quer adicionar a esta meta?')
                        if (amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0) {
                          setGoals(prev => prev.map(g => 
                            g.id === goal.id 
                              ? { ...g, currentAmount: g.currentAmount + parseFloat(amount) }
                              : g
                          ))
                          toast.success('Valor adicionado à meta!')
                        } else if (amount) {
                          toast.error('Valor inválido')
                        }
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Valor
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {goals.length === 0 && (
              <Card className="shadow-lg">
                <CardContent className="text-center py-12">
                  <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Nenhuma meta criada ainda</h3>
                  <p className="text-muted-foreground">Crie sua primeira meta financeira para começar a poupar com objetivo!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Conquistas */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`shadow-lg transition-all duration-300 ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : 'opacity-60'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${achievement.unlocked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'}`}>
                        {achievement.icon === 'CheckCircle' && <CheckCircle className="w-6 h-6" />}
                        {achievement.icon === 'PiggyBank' && <PiggyBank className="w-6 h-6" />}
                        {achievement.icon === 'Trophy' && <Trophy className="w-6 h-6" />}
                        {achievement.icon === 'Award' && <Award className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {achievement.unlocked && (
                          <Badge className="mt-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            <Trophy className="w-3 h-3 mr-1" />
                            Desbloqueada!
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Estatísticas de gamificação */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-purple-600" />
                  Suas Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{userLevel}</div>
                    <div className="text-sm text-muted-foreground">Nível Atual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{userXP}</div>
                    <div className="text-sm text-muted-foreground">XP Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{achievements.filter(a => a.unlocked).length}</div>
                    <div className="text-sm text-muted-foreground">Conquistas</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights IA */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="shadow-lg border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Assistente Financeiro IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-blue-200 bg-blue-50">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      {getAITip()}
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Análise de Gastos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Categoria com mais gastos:</span>
                            <span className="font-medium">
                              {Object.keys(expensesByCategory).length > 0 
                                ? Object.entries(expensesByCategory).sort(([,a], [,b]) => b - a)[0][0]
                                : 'N/A'
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Média de gastos diários:</span>
                            <span className="font-medium">
                              R$ {transactions.length > 0 
                                ? (transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0) / 30).toFixed(2)
                                : '0,00'
                              }
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Recomendações</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Continue registrando suas transações diariamente</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                            <span>Defina metas específicas para cada categoria</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <PiggyBank className="w-4 h-4 text-purple-600 mt-0.5" />
                            <span>Reserve 20% da renda para poupança</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alertas inteligentes */}
            {totalBalance < 0 && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Atenção!</strong> Seu saldo está negativo. Considere revisar seus gastos e criar um plano de recuperação.
                </AlertDescription>
              </Alert>
            )}

            {!simpleMode && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Relatórios Avançados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Funcionalidades avançadas disponíveis no modo avançado:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-medium mb-2">Previsões Financeiras</h4>
                        <p className="text-sm text-muted-foreground">
                          Com base no seu padrão de gastos, você deve atingir suas metas em aproximadamente 6 meses.
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-medium mb-2">Análise de Tendências</h4>
                        <p className="text-sm text-muted-foreground">
                          Seus gastos com alimentação aumentaram 15% este mês comparado ao anterior.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}