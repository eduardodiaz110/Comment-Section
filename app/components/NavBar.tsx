"use client";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function NavBar() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  return (
    <Box sx={{ marginBottom: "30px" }}>
      <AppBar position="static" sx={{ backgroundColor: "#595fb0" }}>
        <Toolbar>
          <Link
            href="/"
            style={{
              flexGrow: 1,
              color: "white",
              textDecoration: "none",
              fontSize: "25px",
              fontWeight: 600,
            }}
          >
            Comments
          </Link>

          <Box>
            {session ? (
              <>
                <Button>
                  <Link
                    href="/"
                    style={{
                      flexGrow: 1,
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Home
                  </Link>
                </Button>
                <Button>
                  <Link
                    href="/dashboard"
                    style={{
                      flexGrow: 1,
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Dashboard
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button>
                  <Link
                    href="/login"
                    style={{
                      flexGrow: 1,
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Login
                  </Link>
                </Button>
                <Button>
                  <Link
                    href="/register"
                    style={{
                      flexGrow: 1,
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Register
                  </Link>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
