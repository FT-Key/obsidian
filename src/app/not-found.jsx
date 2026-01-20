'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, Search, Ghost, Skull, Moon, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

/**
 * Página 404 Not Found - Estilo Gótico Dark Medieval
 * Diseño elegante con elementos decorativos sutiles y animaciones suaves
 */
const NotFoundPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotateVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-gothic-abyss)' }}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cuadrícula sutil */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(var(--color-gothic-steel) 1px, transparent 1px), linear-gradient(90deg, var(--color-gothic-steel) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />

        {/* Gradiente mesh de fondo */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(at 20% 30%, rgba(107, 33, 168, 0.08) 0px, transparent 50%),
              radial-gradient(at 80% 70%, rgba(76, 29, 149, 0.06) 0px, transparent 50%),
              radial-gradient(at 50% 50%, rgba(107, 33, 168, 0.05) 0px, transparent 50%)
            `
          }}
        />

        {/* Círculos decorativos grandes */}
        {mounted && (
          <>
            <motion.div
              className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-5"
              style={{
                background: 'radial-gradient(circle, var(--color-gothic-amethyst) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
              variants={rotateVariants}
              animate="animate"
            />
            
            <motion.div
              className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-5"
              style={{
                background: 'radial-gradient(circle, var(--color-gothic-plum) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
              variants={rotateVariants}
              animate="animate"
            />
          </>
        )}

        {/* Elementos flotantes */}
        {mounted && (
          <>
            <motion.div
              className="absolute top-20 left-20"
              variants={floatVariants}
              animate="animate"
            >
              <Ghost 
                className="w-8 h-8 opacity-10"
                style={{ color: 'var(--color-gothic-smoke)' }}
              />
            </motion.div>

            <motion.div
              className="absolute top-40 right-32"
              variants={floatVariants}
              animate="animate"
              transition={{ delay: 0.5 }}
            >
              <Star 
                className="w-6 h-6 opacity-10"
                style={{ color: 'var(--color-gothic-smoke)' }}
              />
            </motion.div>

            <motion.div
              className="absolute bottom-32 left-40"
              variants={floatVariants}
              animate="animate"
              transition={{ delay: 1 }}
            >
              <Moon 
                className="w-10 h-10 opacity-10"
                style={{ color: 'var(--color-gothic-smoke)' }}
              />
            </motion.div>

            <motion.div
              className="absolute bottom-20 right-20"
              variants={floatVariants}
              animate="animate"
              transition={{ delay: 1.5 }}
            >
              <Skull 
                className="w-7 h-7 opacity-10"
                style={{ color: 'var(--color-gothic-smoke)' }}
              />
            </motion.div>

            {/* Sparkles adicionales */}
            <motion.div
              className="absolute top-1/4 left-1/4"
              variants={floatVariants}
              animate="animate"
              transition={{ delay: 0.8 }}
            >
              <Sparkles 
                className="w-5 h-5 opacity-10"
                style={{ color: 'var(--color-gothic-smoke)' }}
              />
            </motion.div>

            <motion.div
              className="absolute top-3/4 right-1/4"
              variants={floatVariants}
              animate="animate"
              transition={{ delay: 1.2 }}
            >
              <Star 
                className="w-4 h-4 opacity-10"
                style={{ color: 'var(--color-gothic-smoke)' }}
              />
            </motion.div>
          </>
        )}

        {/* Vignette effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, var(--color-gothic-abyss) 100%)'
          }}
        />
      </div>

      {/* Contenido principal */}
      <motion.div 
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Marco decorativo superior */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="relative">
            {/* Línea horizontal superior con decoraciones */}
            <div className="flex items-center justify-center gap-4">
              <div 
                className="h-[1px] w-20 sm:w-32"
                style={{
                  background: 'linear-gradient(to right, transparent, var(--color-gothic-pewter), var(--color-gothic-amethyst))',
                  opacity: 0.5
                }}
              />
              <div 
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: 'var(--color-gothic-amethyst)',
                  opacity: 0.6,
                  boxShadow: '0 0 15px rgba(107,33,168,0.4)'
                }}
              />
              <div 
                className="h-[1px] w-20 sm:w-32"
                style={{
                  background: 'linear-gradient(to left, transparent, var(--color-gothic-pewter), var(--color-gothic-amethyst))',
                  opacity: 0.5
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Número 404 con marco decorativo */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative inline-block">
            {/* Marco decorativo con clip-path */}
            <div 
              className="absolute inset-0 -m-8 opacity-20 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, var(--color-gothic-amethyst) 0%, transparent 50%, var(--color-gothic-plum) 100%)',
                clipPath: 'polygon(0 20%, 20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%)',
                filter: 'blur(15px)'
              }}
            />
            
            {/* Decoración superior con forma gótica */}
            <div 
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-[1px]"
              style={{
                background: 'linear-gradient(to right, transparent, var(--color-gothic-amethyst), transparent)',
                opacity: 0.6
              }}
            >
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0"
                style={{
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderTop: '6px solid var(--color-gothic-amethyst)',
                  opacity: 0.6
                }}
              />
            </div>
            
            {/* Número principal */}
            <h1 
              className="text-[140px] sm:text-[180px] md:text-[220px] font-bold leading-none relative"
              style={{
                background: 'linear-gradient(to bottom, var(--color-gothic-pearl), var(--color-gothic-chrome), var(--color-gothic-silver))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                filter: 'drop-shadow(0 0 25px rgba(107,33,168,0.2)) drop-shadow(0 0 50px rgba(107,33,168,0.1))'
              }}
            >
              404
            </h1>

            {/* Decoración inferior con forma gótica */}
            <div 
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-[1px]"
              style={{
                background: 'linear-gradient(to right, transparent, var(--color-gothic-amethyst), transparent)',
                opacity: 0.6
              }}
            >
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0"
                style={{
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderBottom: '6px solid var(--color-gothic-amethyst)',
                  opacity: 0.6
                }}
              />
            </div>

            {/* Puntos decorativos en esquinas con glow */}
            <div 
              className="absolute -top-2 -left-2 w-[3px] h-[3px] rounded-full"
              style={{
                backgroundColor: 'var(--color-gothic-amethyst)',
                opacity: 0.6,
                boxShadow: '0 0 12px rgba(107,33,168,0.5)'
              }}
            />
            <div 
              className="absolute -top-2 -right-2 w-[3px] h-[3px] rounded-full"
              style={{
                backgroundColor: 'var(--color-gothic-amethyst)',
                opacity: 0.6,
                boxShadow: '0 0 12px rgba(107,33,168,0.5)'
              }}
            />
            <div 
              className="absolute -bottom-2 -left-2 w-[3px] h-[3px] rounded-full"
              style={{
                backgroundColor: 'var(--color-gothic-amethyst)',
                opacity: 0.6,
                boxShadow: '0 0 12px rgba(107,33,168,0.5)'
              }}
            />
            <div 
              className="absolute -bottom-2 -right-2 w-[3px] h-[3px] rounded-full"
              style={{
                backgroundColor: 'var(--color-gothic-amethyst)',
                opacity: 0.6,
                boxShadow: '0 0 12px rgba(107,33,168,0.5)'
              }}
            />
          </div>
        </motion.div>

        {/* Título con decoraciones laterales */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="flex items-center justify-center gap-4">
            <div 
              className="h-[1px] w-12 sm:w-16"
              style={{
                background: 'linear-gradient(to right, transparent, var(--color-gothic-steel))',
                opacity: 0.4
              }}
            />
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ color: 'var(--color-gothic-pearl)' }}
            >
              Página No Encontrada
            </h2>
            <div 
              className="h-[1px] w-12 sm:w-16"
              style={{
                background: 'linear-gradient(to left, transparent, var(--color-gothic-steel))',
                opacity: 0.4
              }}
            />
          </div>
        </motion.div>

        {/* Descripción */}
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg mb-12 max-w-md mx-auto leading-relaxed"
          style={{ color: 'var(--color-gothic-smoke)' }}
        >
          La página que buscas se ha perdido en las sombras. Puede que haya sido movida o ya no exista.
        </motion.p>

        {/* Divisor decorativo con gemas */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="relative h-[1px] max-w-xs mx-auto">
            <div 
              style={{
                background: 'linear-gradient(to right, transparent, var(--color-gothic-pewter), transparent)',
                height: '1px',
                width: '100%'
              }}
            />
            {/* Gema central */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[8px] h-[8px] rotate-45"
              style={{
                background: 'linear-gradient(135deg, var(--color-gothic-amethyst), var(--color-gothic-plum))',
                opacity: 0.5,
                boxShadow: '0 0 15px rgba(107,33,168,0.4)'
              }}
            />
            {/* Gemas laterales */}
            <div 
              className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[4px] rotate-45"
              style={{
                backgroundColor: 'var(--color-gothic-amethyst)',
                opacity: 0.4,
                boxShadow: '0 0 10px rgba(107,33,168,0.3)'
              }}
            />
            <div 
              className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[4px] rotate-45"
              style={{
                backgroundColor: 'var(--color-gothic-amethyst)',
                opacity: 0.4,
                boxShadow: '0 0 10px rgba(107,33,168,0.3)'
              }}
            />
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            variant="primary"
            size="lg"
            icon={Home}
            iconPosition="left"
            onClick={() => router.push('/')}
          >
            Volver al Inicio
          </Button>

          <Button
            variant="outline"
            size="lg"
            icon={ArrowLeft}
            iconPosition="left"
            onClick={() => router.back()}
          >
            Página Anterior
          </Button>
        </motion.div>

        {/* Sugerencia adicional con marco decorativo */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 pt-8 border-t relative"
          style={{ borderTopColor: 'var(--color-gothic-steel)' }}
        >
          {/* Decoración superior del borde */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full"
            style={{
              backgroundColor: 'var(--color-gothic-amethyst)',
              opacity: 0.4,
              boxShadow: '0 0 12px rgba(107,33,168,0.3)'
            }}
          />
          
          <p 
            className="text-sm mb-4"
            style={{ color: 'var(--color-gothic-ash)' }}
          >
            ¿Buscabas algo específico?
          </p>
          
          <Button
            variant="ghost"
            size="md"
            icon={Search}
            iconPosition="left"
            onClick={() => router.push('/productos')}
          >
            Explorar Productos
          </Button>
        </motion.div>

        {/* Código de error decorativo con marco gótico */}
        <motion.div 
          variants={itemVariants}
          className="mt-12"
        >
          <div 
            className="inline-block px-6 py-3 rounded relative"
            style={{
              background: 'linear-gradient(135deg, rgba(var(--color-gothic-iron), 0.3), rgba(var(--color-gothic-shadow), 0.5))',
              borderTop: '1px solid var(--color-gothic-steel)',
              borderBottom: '1px solid var(--color-gothic-steel)',
              backdropFilter: 'blur(12px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {/* Decoraciones en esquinas */}
            <div 
              className="absolute top-0 left-0 w-[2px] h-[2px] rounded-full"
              style={{
                backgroundColor: 'var(--color-gothic-amethyst)',
                opacity: 0.3
              }}
            />
            <div 
              className="absolute top-0 right-0 w-[2px] h-[2px] rounded-full"
              style={{
                backgroundColor: 'var(--color-gothic-amethyst)',
                opacity: 0.3
              }}
            />
            <div 
              className="absolute bottom-0 left-0 w-[2px] h-[2px] rounded-full"
              style={{
                backgroundColor: 'var(--color-gothic-amethyst)',
                opacity: 0.3
              }}
            />
            <div 
              className="absolute bottom-0 right-0 w-[2px] h-[2px] rounded-full"
              style={{
                backgroundColor: 'var(--color-gothic-amethyst)',
                opacity: 0.3
              }}
            />
            
            <code 
              className="text-xs font-mono"
              style={{ color: 'var(--color-gothic-ash)' }}
            >
              ERROR_CODE: 404_PAGE_NOT_FOUND
            </code>
          </div>
        </motion.div>

        {/* Marco decorativo inferior */}
        <motion.div variants={itemVariants} className="mt-12">
          <div className="relative">
            {/* Línea horizontal inferior con decoraciones */}
            <div className="flex items-center justify-center gap-4">
              <div 
                className="h-[1px] w-20 sm:w-32"
                style={{
                  background: 'linear-gradient(to right, transparent, var(--color-gothic-pewter), var(--color-gothic-amethyst))',
                  opacity: 0.5
                }}
              />
              <div 
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: 'var(--color-gothic-amethyst)',
                  opacity: 0.6,
                  boxShadow: '0 0 15px rgba(107,33,168,0.4)'
                }}
              />
              <div 
                className="h-[1px] w-20 sm:w-32"
                style={{
                  background: 'linear-gradient(to left, transparent, var(--color-gothic-pewter), var(--color-gothic-amethyst))',
                  opacity: 0.5
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;