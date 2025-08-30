import React from "react";
import styled from "styled-components";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantMap = {
    "on-sale": {
      copy: "Sale",
      shouldDisplay: true,
      colour: COLORS.primary,
    },
    "new-release": {
      copy: "Just released!",
      shouldDisplay: true,
      colour: COLORS.secondary,
    },
    default: {
      copy: "",
      colour: "",
      shouldDisplay: false,
    },
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Variant
        variant={variant}
        shouldDisplay={variantMap[variant].shouldDisplay}
        colour={variantMap[variant].colour}
      >
        {variantMap[variant].copy}
      </Variant>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant == "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Variant = styled.div`
  background-color: ${({ colour }) => colour};
  position: absolute;
  top: 4px;

  right: -4px;
  z-index: 2;

  padding: 4px 8px;

  color: white;
  font-size: 0.7rem;
  font-weight: ${WEIGHTS.bold};

  ${({ shouldDisplay }) =>
    !shouldDisplay &&
    `
    display: none;
  `}
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  position: relative;
`;

const Wrapper = styled.article`
  width: 400px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};

  margin-right: auto;
`;

const Price = styled.span`
  ${({ variant }) =>
    variant === "on-sale" &&
    `
    color: ${COLORS.gray[700]};
    text-decoration: line-through;
   `}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};

  margin-left: auto;
`;

export default ShoeCard;
