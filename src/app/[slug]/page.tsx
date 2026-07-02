import { getDemoBySlug, DEMO_PRESETS } from '@/lib/demoPresets';
import DemoClientWrapper from '@/components/DemoClientWrapper';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return DEMO_PRESETS.map((preset) => ({
    slug: preset.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DemoPage({ params }: PageProps) {
  const { slug } = await params;
  const preset = getDemoBySlug(slug);

  if (!preset) {
    notFound();
  }

  return <DemoClientWrapper preset={preset} />;
}
