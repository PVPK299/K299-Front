// Chakra imports
import { Box, Grid } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Projects from "views/admin/profile/components/Projects";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import { React, useEffect, useState } from "react";
import { NewUser, User } from "models/user";


export default function Overview() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    var item = JSON.parse(localStorage.getItem('user'));
    console.log(item);
    setIsLoading(false);

    if (item === null) {
      setError('user is not logged in');
    } else {
      setUser(item);
    }

    // var userr = new User(item.id, item.email, item.password, item.first_name, item.last_name)


  }, [])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 2.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        {user && <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name={`${user.first_name} ${user.last_name}`}
          email={user.email}
          posts='17'
          followers='9.7k'
          following='274'
        />}
        {!user && isLoading && <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name='loading...'
          email='loading...'
          posts='17'
          followers='9.7k'
          following='274'
        />}
        {!user && !isLoading && <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name={error}
          email={error}
          posts='17'
          followers='9.7k'
          following='274'
        />}
        <General
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='365px'
          pe='20px'
          user={user}
        />

      </Grid>
    </Box>
  );
}
