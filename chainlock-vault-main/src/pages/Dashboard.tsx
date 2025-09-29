import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AIAdvisor from '@/components/AIAdvisor';
import { 
  Plus, 
  Upload, 
  Users, 
  Search, 
  Filter,
  Eye,
  Share2,
  MoreVertical,
  Shield,
  Clock,
  FileText,
  Image,
  File,
  LogOut,
  User
} from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';
import chainlockerLogo from '@/assets/chainlocker-logo.png';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'text';
  size: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'shared';
  accessRequests: number;
  hash: string;
}

const Dashboard: React.FC = () => {
  const { account, isConnected, disconnectWallet } = useWeb3();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  // Mock documents data
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Passport_Document.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'verified',
      accessRequests: 3,
      hash: '0x7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730'
    },
    {
      id: '2',
      name: 'Academic_Certificate.jpg',
      type: 'image',
      size: '1.2 MB',
      uploadDate: '2024-01-10',
      status: 'shared',
      accessRequests: 1,
      hash: '0x2d745e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97731'
    },
    {
      id: '3',
      name: 'Identity_Proof.pdf',
      type: 'pdf',
      size: '800 KB',
      uploadDate: '2024-01-08',
      status: 'pending',
      accessRequests: 0,
      hash: '0x5f865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97732'
    }
  ]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-destructive" />;
      case 'image': return <Image className="h-5 w-5 text-success" />;
      default: return <File className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-success/20 text-success border-success/40';
      case 'shared': return 'bg-primary/20 text-primary border-primary/40';
      case 'pending': return 'bg-warning/20 text-warning border-warning/40';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={chainlockerLogo} alt="ChainLocker" className="h-8 w-8" />
              <h1 className="text-xl font-bold text-gradient-primary">ChainLocker</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono text-muted-foreground">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </span>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={disconnectWallet}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Digital Vault Dashboard</h2>
          <p className="text-muted-foreground">Manage your decentralized documents and access permissions</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-vault border border-border hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-vault border border-border hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-success/10 border border-success/20">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-vault border border-border hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/10 border border-accent/20">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-muted-foreground">Access Requests</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-vault border border-border hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-warning/10 border border-warning/20">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="hero" 
              onClick={() => navigate('/upload')}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Upload New Document
            </Button>
            
            <Button 
              variant="vault" 
              onClick={() => navigate('/verifier')}
              className="gap-2"
            >
              <Users className="h-4 w-4" />
              Manage Access Requests
            </Button>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 border-border"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Your Documents</h3>
          
          {filteredDocuments.length === 0 ? (
            <Card className="p-12 text-center bg-card/30 border border-dashed border-border">
              <div className="space-y-4">
                <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground">No documents found</h4>
                  <p className="text-muted-foreground">Upload your first document to get started</p>
                </div>
                <Button variant="hero" onClick={() => navigate('/upload')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="p-6 bg-gradient-vault border border-border hover:border-primary/20 transition-all hover:shadow-card-glow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-card/50 border border-border">
                        {getFileIcon(doc.type)}
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="font-semibold text-foreground">{doc.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.uploadDate}</span>
                          <span>•</span>
                          <span className="font-mono text-xs">{doc.hash.slice(0, 10)}...</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        
                        {doc.accessRequests > 0 && (
                          <Badge variant="outline" className="bg-accent/20 text-accent border-accent/40">
                            {doc.accessRequests} requests
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <AIAdvisor />
    </div>
  );
};

export default Dashboard;