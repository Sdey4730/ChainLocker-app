import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, X, MessageSquare, Lightbulb, Shield, TrendingUp } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'security' | 'optimization' | 'feature' | 'warning';
  title: string;
  description: string;
  action?: string;
}

const AIAdvisor: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'security',
      title: 'Enable Two-Factor Authentication',
      description: 'Add an extra layer of security to your vault by enabling 2FA for document access.',
      action: 'Enable 2FA'
    },
    {
      id: '2',
      type: 'optimization',
      title: 'Optimize Storage Costs',
      description: 'Consider archiving older documents to reduce IPFS storage costs by 30%.',
      action: 'View Archive Options'
    },
    {
      id: '3',
      type: 'feature',
      title: 'Share with Team Members',
      description: 'You can now grant selective access to team members for collaborative workflows.',
      action: 'Explore Sharing'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="h-4 w-4" />;
      case 'optimization': return <TrendingUp className="h-4 w-4" />;
      case 'feature': return <Lightbulb className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'security': return 'bg-destructive/20 text-destructive border-destructive/40';
      case 'optimization': return 'bg-success/20 text-success border-success/40';
      case 'feature': return 'bg-primary/20 text-primary border-primary/40';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isExpanded ? (
        <Button
          variant="hero"
          size="lg"
          onClick={() => setIsExpanded(true)}
          className="rounded-full h-14 w-14 p-0 animate-pulse-glow"
        >
          <Bot className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-80 p-4 bg-gradient-vault border border-primary/20 shadow-vault animate-float">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-gradient-primary">AI Advisor</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-3 rounded-lg bg-card/50 border border-border space-y-2">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className={`text-xs ${getTypeColor(rec.type)}`}>
                    {getTypeIcon(rec.type)}
                    {rec.type}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground">{rec.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                </div>

                {rec.action && (
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    {rec.action}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <Button variant="cyber" size="sm" className="w-full">
              <MessageSquare className="h-4 w-4" />
              Chat with AI Assistant
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIAdvisor;