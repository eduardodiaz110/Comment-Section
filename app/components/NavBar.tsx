import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";

export default async function NavBar() {
  const session = await getServerSession();

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
