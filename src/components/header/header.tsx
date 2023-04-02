import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { API_KEY } from '../../service/api.service';
import { SearchContext } from '../../context/SearchContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#7A748B',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      
    },
  },
}));


export default function Header(): JSX.Element {
  const { setData, data } = React.useContext(SearchContext)
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
      return;
    }
    const fetchResults = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(searchTerm)}&type=like&cnt=10&appid=${API_KEY}`);
      const data = await response.json();
      const results = data?.list?.map(result => ({
        name: result.name,
        country: result.sys.country
      }));
      setSearchResults(results);
    };

    const timeoutId = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value.trim());
  };

  const handleResultClick = (result:{name:string, country:string}) => {
    setData(result.name);
    Cookies.set('city', result.name);
    setSearchTerm(`${result.name}, ${result.country}`);
    setSearchResults([]);
    router.replace(router.asPath);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#59516E' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Weather App
          </Typography>
          <Search
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleInputChange}
            />
          </Search>
          {searchResults?.length > 0 && <ul className={`absolute searchList `}>
            {searchResults && searchResults.map((result, index) => (
              <li className='cursor-pointer' key={index} onClick={() => handleResultClick(result)}>{result.name}, {result.country}</li>
            ))}
          </ul>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}