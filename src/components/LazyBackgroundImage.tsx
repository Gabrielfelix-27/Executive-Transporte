import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyBackgroundImageProps {
  src: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
}

export const LazyBackgroundImage: React.FC<LazyBackgroundImageProps> = ({
  src,
  children,
  className,
  style,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && !hasError) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
      img.src = src;
    }
  }, [isInView, src, hasError]);

  const backgroundStyle = {
    ...style,
    backgroundImage: isLoaded ? `url('${src}')` : `url('${placeholder}')`,
    backgroundSize: 'cover',
    backgroundPosition: style?.backgroundPosition || 'center',
    backgroundRepeat: 'no-repeat',
    transition: 'background-image 0.3s ease-in-out'
  };

  return (
    <div
      ref={divRef}
      className={cn('relative', className)}
      style={backgroundStyle}
    >
      {children}
    </div>
  );
};