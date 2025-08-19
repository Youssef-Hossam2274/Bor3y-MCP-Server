import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fetch from "node-fetch";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
dotenv.config();

const api1 = process.env.API_HOST1;

const server = new McpServer({
  name: "Bor3y-mcp-server",
  version: "1.0.0",
  title: "Bor3y MCP Server with Dummy Tool",
});

// Tool 1: Echo
server.tool(
  "echo",
  "Echoes back the input string.",
  {
    text: z.string().describe("Text to echo back"),
  },
  async ({ text }) => ({
    content: [{ type: "text", text }],
  })
);

// Tool 2: Add Numbers
server.tool(
  "add_numbers",
  "Adds two numbers and returns the result.",
  {
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  },
  async ({ a, b }) => {
    console.log(`Bor3y MCP Server: Adding ${a} and ${b}`);
    return {
      content: [{ type: "text", text: `Result: ${a + b}` }],
    };
  }
);

// Tool 3: Create Company (calls Django API)
// This function is used in the Kaj system
server.tool(
  "create_company",
  "Creates a new company using the Django API. This function is used in the Kaj system.",
  {
    token: z.string().describe("JWT token for authentication"),
    CompanyName: z.string(),
    HQCountryID: z.number(),
    OperatingCountryIDs: z.array(z.number()),
    DepartmentName: z.string().optional(),
    CompanyTypeID: z.number(),
    CompanyWebsite: z.string().optional(),
    CompanyLinkedIn: z.string().optional(),
    CompanyLogo: z.string().optional(),
    Address: z.string(),
    State: z.string(),
    ZipCode: z.string(),
    IsSelfRegistered: z.number(),
  },
  async (params) => {
    const { token, ...companyData } = params;
    try {
      const response = await fetch(`${api1}/companies/` || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          TOKEN: token,
        },
        body: JSON.stringify(companyData),
      });
      const text = await response.text();
      return {
        content: [
          { type: "text", text: `Status: ${response.status}\n${text}` },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: `Error: ${e}` }],
      };
    }
  }
);

server.connect(new StdioServerTransport());
