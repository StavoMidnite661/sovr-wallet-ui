import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import WalletTab from "../components/WalletTab";
import VaultTab from "../components/VaultTab";
import DocumentsTab from "../components/DocumentsTab";
import ManifestoTab from "../components/ManifestoTab";
import ComplianceTab from "../components/ComplianceTab";
import StreamTab from "../components/StreamTab";

export default function SOVRApp() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-6">👑 SOVR Wallet</h1>
      <Tabs defaultValue="wallet" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-6 gap-2 bg-gray-800 rounded-xl p-2">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="vault">Vault</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="manifesto">Manifesto</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="stream">Stream</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet">
          <WalletTab />
        </TabsContent>
        <TabsContent value="vault">
          <VaultTab />
        </TabsContent>
        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>
        <TabsContent value="manifesto">
          <ManifestoTab />
        </TabsContent>
        <TabsContent value="compliance">
          <ComplianceTab />
        </TabsContent>
        <TabsContent value="stream">
          <StreamTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
