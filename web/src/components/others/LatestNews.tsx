import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Parliment from "./tabss/Parliment";
import Committees from "./tabss/Committees";
import Videos from "./tabss/Videos";
import Blogs from "./tabss/Blogs";
import Articles from "./tabss/Articles";

function LatestNews() {
  return (
    <Tabs
      defaultValue="Parliment"
      className="w-screen flex justify-center items-center flex-col mx-auto"
    >
      <TabsList>
        <TabsTrigger className="w-52" value="Parliment">
          Parliament
        </TabsTrigger>
        <TabsTrigger className="w-52" value="Committees">
          Committees
        </TabsTrigger>
        {/* <TabsTrigger value="Videos">Videos</TabsTrigger> */}
        <TabsTrigger className="w-52" value="Blogs">
          Blogs
        </TabsTrigger>
        <TabsTrigger className="w-52" value="Articles">
          Articles
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Parliment">
        <Parliment />
      </TabsContent>
      <TabsContent value="Committees">
        <Committees />
      </TabsContent>
      {/* <TabsContent value="Videos">
        <Videos />
      </TabsContent> */}
      <TabsContent value="Blogs">
        <Blogs />
      </TabsContent>
      <TabsContent value="Articles">
        <Articles />
      </TabsContent>
    </Tabs>
  );
}

export default LatestNews;
