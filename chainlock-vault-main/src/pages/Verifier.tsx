import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIAdvisor from '@/components/AIAdvisor';
import { 
  ArrowLeft,
  Search,
  Check,
  X,
  Clock,
  Eye,
  Share2,
  Users,
  Shield,
  FileText,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToast } from '@/hooks/use-toast';
import chainlockerLogo from '@/assets/chainlocker-logo.png';

interface AccessRequest {
  id: string;
  requesterAddress: string;
  requesterName: string;
  documentName: string;
  documentId: string;
  requestDate: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  expiryDate?: string;
}

interface SharedDocument {
  id: string;
  name: string;
  sharedWith: string;
  sharedDate: string;
  accessLevel: 'view' | 'download' | 'verify';
  expiryDate: string;
  status: 'active' | 'expired' | 'revoked';
}

const Verifier: React.FC = () => {
  const { account, isConnected } = useWeb3();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for access requests
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([
    {
      id: '1',
      requesterAddress: '0x742d35Cc6634C0532925a3b8D98d8B947D39F4F5',
      requesterName: 'Government Verification Agency',
      documentName: 'Passport_Document.pdf',
      documentId: 'doc_1',
      requestDate: '2024-01-20',
      purpose: 'Identity verification for government services',
      status: 'pending'
    },
    {
      id: '2',
      requesterAddress: '0x8ba1f109551bD432803012645Hac136c5',
      requesterName: 'Educational Institution',
      documentName: 'Academic_Certificate.jpg',
      documentId: 'doc_2',
      requestDate: '2024-01-19',
      purpose: 'Academic credential verification',
      status: 'pending'
    },
    {
      id: '3',
      requesterAddress: '0x2d745e959b2466918c9863afca942d0fb89d7c9a',
      requesterName: 'HR Department - TechCorp',
      documentName: 'Identity_Proof.pdf',
      documentId: 'doc_3',
      requestDate: '2024-01-18',
      purpose: 'Employee background verification',
      status: 'approved',
      expiryDate: '2024-02-18'
    }
  ]);

  // Mock data for shared documents
  const [sharedDocuments] = useState<SharedDocument[]>([
    {
      id: '1',
      name: 'Academic_Certificate.jpg',
      sharedWith: 'Educational Institution',
      sharedDate: '2024-01-15',
      accessLevel: 'verify',
      expiryDate: '2024-02-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Identity_Proof.pdf',
      sharedWith: 'HR Department - TechCorp',
      sharedDate: '2024-01-10',
      accessLevel: 'view',
      expiryDate: '2024-02-10',
      status: 'active'
    }
  ]);

  const handleApproveRequest = (requestId: string) => {
    setAccessRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved' as const, expiryDate: '2024-02-20' }
        : req
    ));
    
    toast({
      title: "Access Granted",
      description: "Verifier access has been granted successfully.",
    });
  };

  const handleRejectRequest = (requestId: string) => {
    setAccessRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected' as const }
        : req
    ));
    
    toast({
      title: "Access Denied",
      description: "Verifier access request has been rejected.",
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
        return 'bg-success/20 text-success border-success/40';
      case 'pending':
        return 'bg-warning/20 text-warning border-warning/40';
      case 'rejected':
      case 'revoked':
        return 'bg-destructive/20 text-destructive border-destructive/40';
      case 'expired':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'verify':
        return 'bg-primary/20 text-primary border-primary/40';
      case 'view':
        return 'bg-accent/20 text-accent border-accent/40';
      case 'download':
        return 'bg-warning/20 text-warning border-warning/40';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const filteredRequests = accessRequests.filter(req =>
    req.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.documentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSharedDocs = sharedDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.sharedWith.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isConnected) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <img src={chainlockerLogo} alt="ChainLocker" className="h-8 w-8" />
              <h1 className="text-xl font-bold text-gradient-primary">Verifier Access Management</h1>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border">
              <span className="text-sm font-mono text-muted-foreground">
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Access Control Center</h2>
            <p className="text-muted-foreground">
              Manage verifier access requests and monitor shared document permissions
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests or documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 border-border"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-vault border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-warning/10 border border-warning/20">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {accessRequests.filter(req => req.status === 'pending').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-vault border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-success/10 border border-success/20">
                  <Check className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {accessRequests.filter(req => req.status === 'approved').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-vault border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {sharedDocuments.filter(doc => doc.status === 'active').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Shares</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-vault border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/10 border border-accent/20">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {new Set(sharedDocuments.map(doc => doc.sharedWith)).size}
                  </p>
                  <p className="text-sm text-muted-foreground">Verifiers</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="requests" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="requests">Access Requests</TabsTrigger>
              <TabsTrigger value="shared">Shared Documents</TabsTrigger>
            </TabsList>

            {/* Access Requests Tab */}
            <TabsContent value="requests" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Pending Access Requests</h3>
                <Badge variant="outline" className="bg-warning/20 text-warning border-warning/40">
                  {filteredRequests.filter(req => req.status === 'pending').length} pending
                </Badge>
              </div>

              {filteredRequests.length === 0 ? (
                <Card className="p-12 text-center bg-card/30 border border-dashed border-border">
                  <div className="space-y-4">
                    <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-foreground">No access requests found</h4>
                      <p className="text-muted-foreground">When verifiers request access to your documents, they'll appear here</p>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredRequests.map((request) => (
                    <Card key={request.id} className="p-6 bg-gradient-vault border border-border hover:border-primary/20 transition-all">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h4 className="text-lg font-semibold text-foreground">{request.requesterName}</h4>
                              <Badge variant="outline" className={getStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p className="font-mono">{request.requesterAddress}</p>
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <FileText className="h-4 w-4" />
                                  {request.documentName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {request.requestDate}
                                </span>
                              </div>
                            </div>
                          </div>

                          {request.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectRequest(request.id)}
                                className="border-destructive/40 text-destructive hover:bg-destructive/10"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveRequest(request.id)}
                                className="border-success/40 text-success hover:bg-success/10"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="p-4 rounded-lg bg-card/50 border border-border">
                          <p className="text-sm">
                            <span className="font-medium text-foreground">Purpose: </span>
                            <span className="text-muted-foreground">{request.purpose}</span>
                          </p>
                          {request.expiryDate && (
                            <p className="text-sm mt-2">
                              <span className="font-medium text-foreground">Access expires: </span>
                              <span className="text-muted-foreground">{request.expiryDate}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Shared Documents Tab */}
            <TabsContent value="shared" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Shared Documents</h3>
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40">
                  {filteredSharedDocs.filter(doc => doc.status === 'active').length} active
                </Badge>
              </div>

              {filteredSharedDocs.length === 0 ? (
                <Card className="p-12 text-center bg-card/30 border border-dashed border-border">
                  <div className="space-y-4">
                    <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto">
                      <Share2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-foreground">No shared documents found</h4>
                      <p className="text-muted-foreground">Documents you've shared with verifiers will appear here</p>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredSharedDocs.map((doc) => (
                    <Card key={doc.id} className="p-6 bg-gradient-vault border border-border hover:border-primary/20 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <h4 className="text-lg font-semibold text-foreground">{doc.name}</h4>
                            <Badge variant="outline" className={getStatusColor(doc.status)}>
                              {doc.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {doc.sharedWith}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Shared: {doc.sharedDate}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={getAccessLevelColor(doc.accessLevel)}>
                                {doc.accessLevel} access
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Expires: {doc.expiryDate}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AIAdvisor />
    </div>
  );
};

export default Verifier;