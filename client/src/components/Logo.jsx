import React from 'react';

const logoImage = {
  width: '80px'
};

// const gifAnim = {
//   width: '80px',
//   height: '80px',
//   backgroundImage: 'url(http://animaticons.co/wp-content/uploads/animat-wm/animat-map-256x256-color-wm.gif)'
// }

const Logo = props => {
  return (
    <div>
      <img style={logoImage} className="logo" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iU09MSUQgQkxBQ0siIHZpZXdCb3g9IjAgMCAzMiAzMiIgeD0iMHB4IiB5PSIwcHgiPjx0aXRsZT5tYXAsIG5hdmlnYXRpb24sIGxvY2F0aW9uLCBwaW4sIGRpcmVjdGlvbjwvdGl0bGU+PHBhdGggZD0iTTEwLDI3LjExQTEsMSwwLDAsMSw4LjU5LDI4bC03LTMuMTJBMSwxLDAsMCwxLDEsMjRWNGExLDEsMCwwLDEsMS40MS0uOTFsNywzLjExYTEsMSwwLDAsMSwuNTkuOTFaTTMxLDhWMjhhMSwxLDAsMCwxLS40Ni44NEExLDEsMCwwLDEsMzAsMjlhMSwxLDAsMCwxLS40MS0uMDlMMjEsMjUuMDhsLTcuNjEsMy4wNUExLDEsMCwwLDEsMTIsMjcuMlY3LjJhMSwxLDAsMCwxLC42My0uOTNsOC0zLjJhMSwxLDAsMCwxLC43OCwwbDksNEExLDEsMCwwLDEsMzEsOFptLTYuNTIsMi40M2E1LDUsMCwwLDAtNywwLDQuODUsNC44NSwwLDAsMC0uMyw2LjYxbDMsMy42YTEsMSwwLDAsMCwxLjU0LDBsMy0zLjZBNC44NSw0Ljg1LDAsMCwwLDI0LjQ4LDEwLjQzWm0tMi43NywyLjg2YTEuMTUsMS4xNSwwLDAsMC0uMzMtLjIxQTEsMSwwLDAsMCwyMC44LDEzYS42NC42NCwwLDAsMC0uMTguMDYuNzYuNzYsMCwwLDAtLjE4LjA5bC0uMTUuMTJhMSwxLDAsMCwwLS4yMS4zMywxLDEsMCwwLDAsLjIxLDEuMDksMS4xNSwxLjE1LDAsMCwwLC4zMy4yMSwxLDEsMCwwLDAsMS4wOS0uMjEsMS4xNSwxLjE1LDAsMCwwLC4yMS0uMzNBLjg0Ljg0LDAsMCwwLDIyLDE0YTEsMSwwLDAsMC0uMDgtLjM4QTEuMTUsMS4xNSwwLDAsMCwyMS43MSwxMy4yOVoiPjwvcGF0aD48L3N2Zz4="
        />
      <h2>Meet people. <br/>Explore the city.</h2>
    </div>
  );
};

export default Logo;